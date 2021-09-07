import React, { Component } from 'react'
import grumpyLogo from '../grumpy-logo.png'
import pawthLogo from '../Pawth_logo.png'
import "./App.css"
class SwapGrumpyForPawth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grumpyToSwap: '0',
      output: '0'
    }
  }

  maxGrumpy () {
    const max = window.web3.utils.fromWei(this.props.grumpyBalance, 'Shannon')
    this.input.value = max.toString()
    this.setState({ 
      grumpyToSwap: this.props.grumpyBalance,
      output: max / 100000
    })
  }

  handleChange(e) {
    this.setState({ output: e.target.value.toString() });
  }

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          this.props.swapGrumpyForPawth(this.state.grumpyToSwap)
        }}>
        <div >
          <label className="float-left paw"><b>Input</b></label>
          <span className="float-right text-muted">

          </span>
        </div>
        <div className="input-group">
          <input
            type="text"
            onChange={(event) => {
              const grumpyAmount = this.input.value.toString()
              this.setState({
                grumpyToSwap: grumpyAmount*10**9,
                output: grumpyAmount / 100000
              })
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={grumpyLogo} height='32' alt=""/>
              &nbsp; Grumpy
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          <button 
            disabled={!this.props.account}
            className="mt-2 mb-2 btn-text"
            type="button"
            onClick={() => { this.maxGrumpy() }}
          >Max</button>
        </div>
        <div>
          <label className="float-left"><b>Output</b></label>
          <span className="float-right text-muted">
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={pawthLogo} height='32' alt=""/>
              &nbsp;&nbsp;&nbsp; PAWTH
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">100k GRUMPY = 1 PAWTH</span>
        </div>
        <button disabled={!this.props.account} type="submit" className="btn pawth_color_2 btn-block btn-lg">SWAP!</button>
      </form>
    );
  }
}

export default SwapGrumpyForPawth;
