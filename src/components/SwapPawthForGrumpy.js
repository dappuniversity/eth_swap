import React, { Component } from 'react'
import grumpyLogo from '../grumpy-logo.png'
import pawthLogo from '../Pawth_logo.png'
class SwapPawthForGrumpy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let pawthAmount
          pawthAmount = this.input.value
          pawthAmount = (pawthAmount * 10**9)
          console.log("Pawth to be swapped is ",pawthAmount)
          this.props.swapPawthForGrumpy(pawthAmount)
        }}>
        <div>
          <label className="float-left"><b>Input</b></label>
          <span className="float-right text-muted">

          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const pawthAmount = this.input.value.toString()
              this.setState({
                output: pawthAmount * 100000
              })
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={pawthLogo} height='32' alt=""/>
              &nbsp;&nbsp;&nbsp; PAWTH
            </div>
          </div>
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
              <img src={grumpyLogo} height='32' alt=""/>
              &nbsp; Grumpy
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">1 PAWTH = 100k GRUMPY</span>
        </div>
        <button disabled={!this.props.account} type="submit" className="btn pawth_color_2 btn-block btn-lg">SWAP! <bold>(only Pawth devs may swap in this direction)</bold></button>
      </form>
    );
  }
}

export default SwapPawthForGrumpy;
