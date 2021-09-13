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
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
