import React, { Component } from 'react'
import SwapPawthForGrumpy from './SwapPawthForGrumpy'
import SwapGrumpyForPawth from './SwapGrumpyForPawth'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyIcon, CheckIcon } from '@primer/octicons-react'

import "./App.css"
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy',
      showDirectionalBtns: false,
      value: this.props.grumpyAddress,
      copied: false,
      copiedPawth: false
    }
  }

  componentDidMount () {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    this.setState({ showDirectionalBtns: params.showDirectionalButtons })
  }

  render() {
    let content
    if(this.state.currentForm === 'buy') {
      content = <SwapGrumpyForPawth
        account={this.props.account}
        grumpyPawthSwapBalance={this.props.grumpyPawthSwapBalance}
        pawthBalance={this.props.pawthBalance}
        grumpyBalance={this.props.grumpyBalance}
        swapGrumpyForPawth={this.props.swapGrumpyForPawth}
        grumpyApproved={this.props.grumpyApproved}
        approveGrumpyTransaction={this.props.approveGrumpyTransaction}
        loading={this.props.loading}
        swapAddress={this.props.swapAddress}
      />
    } else {
      content = <SwapPawthForGrumpy
        account={this.props.account}
        grumpyPawthSwapBalance={this.props.grumpyPawthSwapBalance}
        pawthBalance={this.props.pawthBalance}
        grumpyBalance={this.props.grumpyBalance}
        swapPawthForGrumpy={this.props.swapPawthForGrumpy}
      />
    }

    return (
      <div id="content" className="mt-3 fullscreen">
        
        {
          this.state.showDirectionalBtns
          ?
          <div className="d-flex justify-content-between mb-3">
            <button
                className="btn btn-light pawth_color_2 rounded"
                onClick={(event) => {
                  this.setState({ currentForm: 'sell' })
                }}
              >
              Pawth to Grumpy
            </button>
            <span className="text-muted">&lt; &nbsp; &gt;</span>
            <button
                className="btn btn-light pawth_color_2 rounded"
                onClick={(event) => {
                  this.setState({ currentForm: 'buy' })
                }}
              >
              Grumpy to Pawth
            </button>
          </div>
          :
          <div className="d-flex justify-content-between mb-3"></div>
        }
        <div className="card mb-4 rounded shadow">

          <div className="card-body">

            {content}

          </div>
          <hr/>
          <div className="container">
            <div className="row">
              <div className="col d-flex justify-content-center mb-3">
                Addresses
              </div>
            </div>
            <div className="row">
              <div className="col d-flex">
                <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Grumpy</span>
                  </div>
                  <input
                    readOnly
                    value={this.props.grumpyAddress}
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="0"
                    required 
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <CopyToClipboard text={this.props.grumpyAddress}
                        onCopy={() => {
                          this.setState({copied: true})
                          setTimeout(() => this.setState({copied: false}), 3000) 
                        }}>
                        <button className="btn-text">{ this.state.copied ? <CheckIcon /> : <CopyIcon />}</button>
                      </CopyToClipboard>
                    </span>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex">
                <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Pawth</span>
                  </div>
                  <input
                    readOnly
                    value={this.props.pawthAddress}
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="0"
                    required 
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <CopyToClipboard text={this.props.pawthAddress}
                        onCopy={() => {
                          this.setState({copiedPawth: true})
                          setTimeout(() => this.setState({copiedPawth: false}), 3000) 
                        }}>
                        <button className="btn-text">{ this.state.copiedPawth ? <CheckIcon /> : <CopyIcon />}</button>
                      </CopyToClipboard>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex">
                <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Swap Contract</span>
                  </div>
                  <input
                    readOnly
                    value={this.props.swapAddress}
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="0"
                    required 
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <CopyToClipboard text={this.props.swapAddress}
                        onCopy={() => {
                          this.setState({copiedSwapAddress: true})
                          setTimeout(() => this.setState({copiedSwapAddress: false}), 3000) 
                        }}>
                        <button className="btn-text">{ this.state.copiedSwapAddress ? <CheckIcon /> : <CopyIcon />}</button>
                      </CopyToClipboard>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        <div className="card mb-4 rounded shadow">
          <div className="card-body">
            <h4 className="descriptiveFont">Instructions</h4>
            <p className="descriptiveFont">If on a mobile wallet (e.g., Metamask, Coinbase Wallet for mobile), visit this website from the browser tab in that wallet. If you have Trust Wallet for iPhone, you will need to swap using etherscan and instructions are at the bottom of this page. Trust Wallet for Android should still support broswers. If on a desktop, you will need to have the browser extension of your wallet installed (e.g., Metamask Chrome Extension). Please watch this tutorial that we made to see the swap process on both desktop and mobile: <a href="https://www.youtube.com/watch?v=FXGmObA1TC8" target="_blank">Click for Tutorial</a></p>
            <p className="descriptiveFont">Instruction 1: Click "Connect" in the top right corner. Check to make sure that the wallet address where you're storing your Grumpy appears.</p>
            <p className="descriptiveFont">Instruction 2: If you want to swap all of your Grumpy, click "Max". Otherwise, enter the amount that you want to swap into the "Input" box.</p>
            <p className="descriptiveFont">Instruction 3: Click "Approve Grumpy", and confirm this approval in your wallet. Wait while this transaction goes through.</p>
            <p className="descriptiveFont">Instruction 4: Click "Swap!". Confirm this transaction in your wallet. If the "confirm" button is greyed out in your wallet, you may need to click "edit" and then choose a gas fee (e.g., a medium gas fee). Wait while this transaction goes through.</p>
            <p className="descriptiveFont">All done! If in Metamask, you can check out your Pawth balance by selecting "Add Token", and then copying the Pawth address below into the "Token Contract Address" box.</p>
            <p className="descriptiveFont">If you're using Trust Wallet for iPhone, you can either transfer Grumpy to a wallet that supports Browsers or swap via Etherscan. The tutorial for this is here: <a href="https://youtu.be/ivc-NjNiUOU" target="_blank">Click here for tutorial</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
