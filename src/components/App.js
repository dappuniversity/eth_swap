import React, { Component } from 'react'
import Web3 from 'web3'
import Grumpy from '../abis/Grumpy.json'
import Pawth from '../abis/Pawth.json'
import GrumpyPawthSwap from '../abis/GrumpyPawthSwap.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // const ethBalance = await web3.eth.getBalance(this.state.account)
    // this.setState({ ethBalance })

    const networkId =  await web3.eth.net.getId()

    // Load Grumpy
    const grumpyData = Grumpy.networks[networkId]
    if(grumpyData) {
      const grumpy = new web3.eth.Contract(Grumpy.abi, grumpyData.address)
      this.setState({ grumpy })
      let grumpyBalance = await grumpy.methods.balanceOf(this.state.account).call()
      this.setState({ grumpyBalance: grumpyBalance.toString() })
    } else {
      window.alert('Grumpy contract not deployed to detected network.')
    }

    // Load Pawth
    const pawthData = Pawth.networks[networkId]
    if (pawthData) {
      const pawth = new web3.eth.Contract(Pawth.abi, pawthData.address)
      this.setState({ pawth })
      let pawthBalance = await pawth.methods.balanceOf(this.state.account).call()
      this.setState({ pawthBalance: pawthBalance.toString() })
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
      this.setState({ grumpyPawthSwapBalance: grumpyPawthSwapBalance.toString() })
    } else {
      window.alert('GrumpyPawthSwap contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  swapPawthforGrumpy = (pawthAmount) => {
    this.setState({ loading: true })
    this.state.pawth.methods.approve(this.state.grumpyPawthSwap.address, pawthAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.grumpyPawthSwap.methods.swapPawthforGrumpy(pawthAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  sellTokens = (grumpyAmount) => {
    this.setState({ loading: true })
    this.state.grumpy.methods.approve(this.state.grumpyPawthSwap.address, grumpyAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.grumpyPawthSwap.methods.sellTokens(grumpyAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      grumpy: {},
      path: {},
      grumpyPawthSwap: {},
      grumpyPawthSwapBalance: '0',
      grumpyBalance: '0',
      pawthBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        grumpyPawthSwapBalance={this.state.grumpyPawthSwapBalance}
        pawthBalance={this.state.pawthBalance}
        grumpyBalance={this.state.grumpyBalance}
        swapPawthforGrumpy={this.swapPawthforGrumpy}
        sellTokens={this.sellTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
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
