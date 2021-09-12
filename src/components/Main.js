import React, { Component } from 'react'
import SwapPawthForGrumpy from './SwapPawthForGrumpy'
import SwapGrumpyForPawth from './SwapGrumpyForPawth'
import "./App.css"
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy',
      showDirectionalBtns: false
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

        </div>
        <div>
          <p className="smallFont">Grumpy: {this.props.grumpyAddress} </p>
          <p className="smallFont">Pawth: {this.props.pawthAddress} </p>
        </div>

      </div>
    );
  }
}

export default Main;
