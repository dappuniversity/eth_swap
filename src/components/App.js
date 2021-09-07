import React, { Component } from 'react'
import Web3 from 'web3'
import Identicon from 'identicon.js';
import pawthLogo from '../pawth-horizontal.png'
import Grumpy from '../abis/Grumpy.json'
import Pawth from '../abis/Pawth.json'
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

    const networkId =  await web3.eth.net.getId()

    // Load Grumpy
    const grumpyData = Grumpy.networks[networkId]
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

  swapGrumpyForPawth = (grumpyAmount) => {
    this.setState({ loading: true })
    this.state.grumpy.methods.approve(this.state.grumpyPawthSwap.address, grumpyAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.grumpyPawthSwap.methods.swapGrumpyForPawth(grumpyAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.loadBlockchainData()
        this.setState({ loading: false })
      })
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
      grumpy: {},
      path: {},
      grumpyPawthSwap: {},
      grumpyPawthSwapBalance: '0',
      grumpyBalance: '0',
      pawthBalance: '0',
      loading: false
    }
  }

  render() {
    let content
    content = <Main
      grumpyPawthSwapBalance={this.state.grumpyPawthSwapBalance}
      pawthBalance={this.state.pawthBalance}
      grumpyBalance={this.state.grumpyBalance}
      account={this.state.account}
      swapPawthForGrumpy={this.swapPawthForGrumpy}
      swapGrumpyForPawth={this.swapGrumpyForPawth}
    />

    return (
      <div  className="fullscreen">
        <nav className="navbar fixed-top flex-md-nowrap p-1">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            href="https://pawthereum.com/"
            rel="noopener noreferrer"
          >
            <img src={pawthLogo} height="24x"></img>
          </a>

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              {
                this.state.account
                ?
                <button 
                  className="btn pawth_color_2 rounded" 
                  onClick={this.disconnect.bind(this)}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                  {this.state.account.slice(0,6) + '...' + this.state.account.substring(this.state.account.length - 4)}
                  <img
                    className="ml-2 circle"
                    width='30'
                    height='30'
                    src={`data:image/png;base64,${new Identicon(this.state.account, 30).toString()}`}
                    alt=""
                  />
                </button>
                :
                <button 
                  className="btn pawth_color_2 rounded" 
                  onClick={this.loadBlockchainData.bind(this)}
                >Connect</button>
              }
            </li>
          </ul>
        </nav>
        <div 
          className={`${this.state.loading ? "container-fluid mt-5 no_margin loading" : "container-fluid mt-5 no_margin"}`}
        >
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
        
          </div>
         
        </div>
      </div>
    );
  }
}

export default App;
