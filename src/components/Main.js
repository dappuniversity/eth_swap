import React, { Component } from 'react'
import SwapPawthForGrumpy from './SwapPawthForGrumpy'
import SwapGrumpyForPawth from './SwapGrumpyForPawth'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy'
    }
  }

  render() {
    let content
    if(this.state.currentForm === 'buy') {
      content = <SwapGrumpyForPawth
        grumpyPawthSwapBalance={this.props.grumpyPawthSwapBalance}
        pawthBalance={this.props.pawthBalance}
        grumpyBalance={this.props.grumpyBalance}
        swapGrumpyForPawth={this.props.swapGrumpyForPawth}
      />
    } else {
      content = <SwapPawthForGrumpy
        grumpyPawthSwapBalance={this.props.grumpyPawthSwapBalance}
        pawthBalance={this.props.pawthBalance}
        grumpyBalance={this.props.grumpyBalance}
        swapPawthForGrumpy={this.props.swapPawthForGrumpy}
      />
    }

    return (
      <div id="content" className="mt-3">
        
        <div className="d-flex justify-content-center mb-3">
          GrumpyPathSwap Pawth Balance: { this.props.grumpyPawthSwapBalance }
        </div>

        <div className="d-flex justify-content-between mb-3">
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'sell' })
              }}
            >
            Pawth to Grumpy
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'buy' })
              }}
            >
            Grumpy to Pawth
          </button>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            {content}

          </div>

        </div>

      </div>
    );
  }
}

export default Main;
