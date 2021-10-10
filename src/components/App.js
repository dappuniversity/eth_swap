import React, { Component } from 'react'
import Web3 from 'web3'
import Jazzicon from '@metamask/jazzicon'
import pawthLogo from '../pawth-horizontal.png'
import pawthLogoSmall from '../Pawth_logo.png'
import Grumpy from '../abis/Grumpy.json'
import Pawth from '../abis/Pawthereum.json'
import GrumpyPawthSwap from '../abis/GrumpyPawthSwap.json'
import Main from './Main'
import './App.css'
import { AlertIcon } from '@primer/octicons-react'

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
    const account = accounts[0]

    const networkId =  await web3.eth.net.getId()

    // Load Grumpy
    const grumpyData = Grumpy.networks[networkId]
    this.setState({ grumpyAddress: grumpyData.address })
    if(grumpyData) {
      const grumpy = new web3.eth.Contract(Grumpy.abi, grumpyData.address)
      this.setState({ grumpy })
      let grumpyBalance = await grumpy.methods.balanceOf(account).call()
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
      let pawthBalance = await pawth.methods.balanceOf(account).call()
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

    this.setState({ account })
    document.getElementById('avatar').appendChild(Jazzicon(20, parseInt(this.state.account.slice(2, 10), 16)))

    const allowanceCall = await this.state.grumpy.methods.allowance(this.state.account, this.state.grumpyPawthSwap.address).call()
    const allowance = allowanceCall.toString()
    if (allowance !== '0') {
      this.setState({ showApprovedWarning: true })
    }
    this.setState({ allowance })

    const swapLimitCall = await this.state.grumpyPawthSwap.methods.swapLimit(this.state.account).call()
    const swapLimit = swapLimitCall.toString()
    this.setState({ swapLimit })
    console.log('swap limit', swapLimit)

    this.setState({ loading: false })
  }

  swapPawthForGrumpy = (pawthAmount) => {
    this.setState({ loading: true })
    this.state.pawth.methods.approve(this.state.grumpyPawthSwap.address, pawthAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.grumpyPawthSwap.methods.swapPawthForGrumpy(pawthAmount).send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false })
        this.setState({ showApprovedWarning: true })
      })
      .on('error', err => {
        console.log('error', err)
        this.setState({ loading: false })
        this.setState({ showApprovedWarning: true })
      })
    })
  }

  approveGrumpyTransaction = (grumpyAmount) => {
    this.setState({ loading: true })
    this.state.grumpy.methods.approve(this.state.grumpyPawthSwap.address, grumpyAmount).send({ from: this.state.account })
    .on('confirmation', (confirmationNumber, receipt) => {
      this.setState({ showAdditionalTxBanner: true })
      this.setState({grumpyApproved: true})
      this.setState({loading:false})
    })
    .on('error', err => {
      console.log('err ', err)
    })
  }

  swapGrumpyForPawth = (grumpyAmount) => {
    this.setState({loading:true})
    this.state.grumpyPawthSwap.methods.swapGrumpyForPawth(grumpyAmount).send({ from: this.state.account })
    .on('confirmation', (hash) => {
      this.setState({ loading: false })
      this.setState({grumpyApproved:false})
      
    })
    .on('error', err => {
      console.log('error', err)
      this.setState({ loading: false })
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
      allowance: '0',
      swapLimit: '0',
      grumpyApproved:false,
      grumpy: {},
      grumpyAddress: '0x93b2fff814fcaeffb01406e80b4ecd89ca6a021b',
      pawth: {},
      pawthAddress: '0xAEcc217a749c2405b5ebC9857a16d58Bdc1c367F',
      swapAddress: '0x405715ab97d667be039396adbc99b440d327febb',
      grumpyPawthSwap: {},
      grumpyPawthSwapBalance: '0',
      grumpyBalance: '0',
      pawthBalance: '0',
      etherscanLink: '',
      showSuccessMessage: false,
      showAdditionalTxBanner: false,
      showApprovedWarning: false,
      loading: false
    }
  }

  render() {
    let content
    content = <Main
      allowance={this.state.allowance}
      swapLimit={this.state.swapLimit}
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
            <div className="col pr-0">
              <a
                className="navbar-brand"
                target="_blank"
                href="https://pawthereum.com/"
                rel="noopener noreferrer"
              >
                <img className="d-none d-sm-block" src={pawthLogo} height="24x"></img>
                <img className="d-block d-sm-none" src={pawthLogoSmall} height="32x"></img>
              </a>
            </div>
            {/* <div className="col" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
              <button type="button" className="btn btn-primary rounded mr-2" data-toggle="modal" data-target="#exampleModal">
                Instructions
              </button>
              {
                this.state.account
                ?
                <button 
                  className="btn pawth_color_2 rounded" 
                  onClick={this.disconnect.bind(this)}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                  <span className="pt-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            </div> */}
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
                {
                  this.state.showApprovedWarning
                  ?
                  <div className="rounded shadow alert alert-warning alert-dismissible fade show" role="alert">
                    <AlertIcon size="24" className="mr-2" />
                    <strong>Avoid unnecessary transaction costs!</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <hr/>
                    <p className="mb-0">You have already approved this dApp to swap your grumpy. Click "Max Approved" to input your approved grumpy amount!</p>
                  </div>
                  :
                  <div></div>
                }
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
                  {/* {content} */}
                  <div className="card mb-4 rounded shadow">
                    <h5 class="card-title pt-4 text-center">The swap period has ended!</h5>
                    <div className="card-body text-center card-text">
                      Thank you to everyone who swapped <br />
                      Pawthereum is being traded on Uniswap!
                    </div>
                  </div>
                </div>
              </div>

              
            </main>

          </div>

        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Instructions</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="descriptiveFont">If on a mobile wallet (e.g., Metamask, Coinbase Wallet for mobile), visit this website from the browser tab in that wallet. If you have Trust Wallet for iPhone, you will need to swap using etherscan and instructions are at the bottom of this page. Trust Wallet for Android should still support broswers. If on a desktop, you will need to have the browser extension of your wallet installed (e.g., Metamask Chrome Extension). Please watch this tutorial that we made to see the swap process on both desktop and mobile: <a href="https://www.youtube.com/watch?v=FXGmObA1TC8" target="_blank">Click for Tutorial</a></p>
                <p className="descriptiveFont">If you're using Trust Wallet for iPhone, you can either transfer Grumpy to a wallet that supports Browsers or swap via Etherscan. The tutorial for this is here: <a href="https://youtu.be/ivc-NjNiUOU" target="_blank">Click here for tutorial</a></p>

                <div id="list-example" className="list-group pb-4">
                  <a className="list-group-item list-group-item-action" href="#list-item-1">Step 1: Connect Wallet</a>
                  <a className="list-group-item list-group-item-action" href="#list-item-2">Step 2: Input Grumpy Amount</a>
                  <a className="list-group-item list-group-item-action" href="#list-item-3">Step 3: Approve Grumpy</a>
                  <a className="list-group-item list-group-item-action" href="#list-item-4">Step 4: Swap for Pawth</a>
                  <a className="list-group-item list-group-item-action" href="#list-item-5">Step 5: View Pawth in Wallet</a>
                </div>
                <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                  <h4 id="list-item-1">Step 1: Connect Wallet</h4>
                  <p className="descriptiveFont">Click "Connect" in the top right corner. Check to make sure that the wallet address where you're storing your Grumpy appears.</p>
                  <h4 id="list-item-2">Step 2: Input Grumpy Amount</h4>
                  <p className="descriptiveFont">If you want to swap all of your Grumpy, click "Max". Otherwise, enter the amount that you want to swap into the "Input" box.</p>
                  <h4 id="list-item-3">Step 3: Approve Grumpy</h4>
                  <p className="descriptiveFont">Click "Approve Grumpy", and confirm this approval in your wallet. Wait while this transaction goes through.</p>
                  <h4 id="list-item-4">Step 4: Swap for Pawth</h4>
                  <p className="descriptiveFont">Click "Swap!". Confirm this transaction in your wallet. If the "confirm" button is greyed out in your wallet, you may need to click "edit" and then choose a gas fee (e.g., a medium gas fee). Wait while this transaction goes through.</p>
                  <h4 id="list-item-5">Step 5: View Pawth in Wallet</h4>
                  <p className="descriptiveFont">All done! If in Metamask, you can check out your Pawth balance by selecting "Add Token", and then copying the Pawth address below into the "Token Contract Address" box.</p>
                </div>
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn pawth_color_2 rounded" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      

      </div>
    );
  }
}

export default App;
