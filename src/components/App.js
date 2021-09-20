import React, { Component } from 'react'
import Web3 from 'web3'
import Jazzicon from '@metamask/jazzicon'
import pawthLogo from '../pawth-horizontal.png'
import Grumpy from '../abis/Grumpy.json'
import Pawth from '../abis/Pawthereum.json' // TODO: CHANGE THIS WHEN GOING LIVE
import GrumpyPawthSwap from '../abis/GrumpyPawthSwap.json'
import Main from './Main'
import './App.css'

class App extends Component {

  disconnect () {
    this.setState({ account: null })
  }

  async loadBlockchainData() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Consider using metamask!')
    }

    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    document.getElementById('avatar').appendChild(Jazzicon(20, parseInt(this.state.account.slice(2, 10), 16)))


    const networkId =  await web3.eth.net.getId()

    // Load Grumpy
    const grumpyData = Grumpy.networks[networkId]
    this.setState({ grumpyAddress: grumpyData.address })
    if(grumpyData) {
      const grumpy = new web3.eth.Contract(Grumpy.abi, grumpyData.address)
      this.setState({ grumpy })
      let grumpyBalance = await grumpy.methods.balanceOf(this.state.account).call()
      this.setState({ grumpyBalance: grumpyBalance ? grumpyBalance.toString() : '0' })
    } else {
      window.alert('Grumpy contract not deployed to detected network.')
    }

    // Load Pawth
    const pawthData = Pawth.networks[networkId]
    this.setState({ pawthAddress: pawthData.address })
    if (pawthData) {
      const pawth = new web3.eth.Contract(Pawth.abi, pawthData.address)
      this.setState({ pawth })
      let pawthBalance = await pawth.methods.balanceOf(this.state.account).call()
      this.setState({ pawthBalance: pawthBalance ? pawthBalance.toString() : '0' })
    } else {
      window.alert('Pawth contract not deployed to detected network.')
    }

    // Load Swap
    const grumpyPawthSwapData = GrumpyPawthSwap.networks[networkId]
    if(grumpyPawthSwapData) {
      const grumpyPawthSwap = new web3.eth.Contract(GrumpyPawthSwap.abi, grumpyPawthSwapData.address)
      this.setState({ grumpyPawthSwap })
      const pawth = this.state.pawth
      let grumpyPawthSwapBalance = await pawth.methods.balanceOf(grumpyPawthSwap.address).call()
      this.setState({ grumpyPawthSwapBalance: grumpyPawthSwapBalance ? grumpyPawthSwapBalance.toString() : '0' })
    } else {
      window.alert('GrumpyPawthSwap contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  swapPawthForGrumpy = (pawthAmount) => {
    this.setState({ loading: true })
    this.state.pawth.methods.approve(this.state.grumpyPawthSwap.address, pawthAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.grumpyPawthSwap.methods.swapPawthForGrumpy(pawthAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  approveGrumpyTransaction = (grumpyAmount) => {
    this.setState({ loading: true })
    this.state.grumpy.methods.approve(this.state.grumpyPawthSwap.address, grumpyAmount).send({ from: this.state.account }).on('confirmation', (confirmationNumber, receipt) => {
      this.setState({ showAdditionalTxBanner: true })
      this.setState({grumpyApproved: true})
      this.setState({loading:false})
    })
  }

  swapGrumpyForPawth = (grumpyAmount) => {
    this.setState({loading:true})
    this.state.grumpyPawthSwap.methods.swapGrumpyForPawth(grumpyAmount).send({ from: this.state.account }).on('confirmation', (hash) => {
      this.setState({ loading: false })
      this.setState({grumpyApproved:false})
    })
  }
  // claimAllPawth = () => {
  //   this.setState({ loading: true })
  //   this.state.grumpyPawthSwap.methods.reclaim_all_pawth_tokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
  //     this.setState({ loading: false })
  //   })
  // }

  // claimAllGrumpy = () => {
  //   this.setState({ loading: true })
  //   this.state.grumpyPawthSwap.methods.reclaim_all_grumpy_tokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
  //     this.setState({ loading: false })
  //   })
  // }

  constructor(props) {
    super(props)
    this.state = {
      account: null,
      grumpyApproved:false,
      grumpy: {},
      grumpyAddress: '0x4b01D88869822B3Cb9B938C66B5b3E1ce0061314',
      pawth: {},
      pawthAddress: '0xb6739cCD86fd6953814a7578e743f1913AAA074E',
      swapAddress: '0x82F88782b1Cec0CDe9DA07Fc92267A56948C804b',
      grumpyPawthSwap: {},
      grumpyPawthSwapBalance: '0',
      grumpyBalance: '0',
      pawthBalance: '0',
      etherscanLink: '',
      showSuccessMessage: false,
      showAdditionalTxBanner: false,
      loading: false
    }
  }

  render() {
    let content
    content = <Main
      grumpyAddress={this.state.grumpyAddress}
      pawthAddress={this.state.pawthAddress}
      swapAddress={this.state.swapAddress}
      grumpyPawthSwapBalance={this.state.grumpyPawthSwapBalance}
      pawthBalance={this.state.pawthBalance}
      grumpyBalance={this.state.grumpyBalance}
      account={this.state.account}
      swapPawthForGrumpy={this.swapPawthForGrumpy}
      approveGrumpyTransaction={this.approveGrumpyTransaction}
      swapGrumpyForPawth={this.swapGrumpyForPawth}
      grumpyApproved={this.state.grumpyApproved}
      loading={this.state.loading}
    />

    return (
      <div  className="fullscreen">
        <nav className="navbar fixed-top" style={{ display: 'block' }}>
          <div className="row align-items-center justify-content-center">
            <div className="col">
              <a
                className="navbar-brand"
                target="_blank"
                href="https://pawthereum.com/"
                rel="noopener noreferrer"
              >
                <img src={pawthLogo} height="24x"></img>
              </a>
            </div>
            <div className="col" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
              {
                this.state.account
                ?
                <button 
                  className="btn pawth_color_2 rounded" 
                  onClick={this.disconnect.bind(this)}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                  <span class="pt-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {this.state.account.slice(0,6) + '...' + this.state.account.substring(this.state.account.length - 4)}
                  </span>
      
                  <span id="avatar" className="pl-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}></span>
                </button>
                :
                <button 
                  className="btn pawth_color_2 rounded" 
                  onClick={this.loadBlockchainData.bind(this)}
                >Connect</button>
              }
            </div>
          </div>

        </nav>

        
        <div className="container-fluid no_margin">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto mt-5" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                {/* {
                  this.state.showAdditionalTxBanner 
                  ?
                  <div className="alert alert-primary rounded shadow" role="alert">
                    Confirm the transaction in your wallet to execute the swap!
                  </div>
                  :
                  <div></div>
                }
                {
                  this.state.showSuccessMessage 
                  ?
                  <div className="alert alert-success rounded shadow" role="alert">
                    View your transaction details on <a href={this.state.etherscanLink} class="alert-link">etherscan</a>!
                  </div>
                  :
                  <div></div>
                } */}
                <div className={`${this.state.loading ? "loading" : ""}`}>
                  {content}
                </div>
              </div>

              
            </main>

          </div>

        </div>
      

      </div>
    );
  }
}

export default App;
