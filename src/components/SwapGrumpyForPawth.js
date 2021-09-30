import React, { Component } from 'react'
import grumpyLogo from '../grumpy-logo.png'
import pawthLogo from '../Pawth_logo.png'
import "./App.css"
class SwapGrumpyForPawth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grumpyAllowanceApproved: false,
      grumpyToSwap: '0',
      output: '0'
    }
  }

  maxApprovedGrumpy () {
    const max = window.web3.utils.fromWei(this.props.allowance, 'Shannon')
    this.input.value = max.toString()
    this.setState({ 
      grumpyToSwap: this.props.allowance,
      output: max / 100000
    })
    this.compareAllowanceToInput(this.input.value)
  }

  maxSwapLimitGrumpy () {
    const max = window.web3.utils.fromWei(this.props.swapLimit, 'Shannon')
    this.input.value = max.toString()
    this.setState({
      grumpyToSwap: this.props.swapLimit,
      output: max / 100000
    })
    this.compareAllowanceToInput(this.input.value)
  }

  compareAllowanceToInput (inputValue) {
    if (this.props.allowance == '0') {
      return this.setState({
        grumpyAllowanceApproved: false
      })
    }
    // TODO: ParseInt could run into edge cases where people can swap even if not yet approved
    // their transaction will revert
    const allowanceTruncated = parseInt(this.props.allowance.substr(0, this.props.allowance.length - 9))
    if (allowanceTruncated >= parseInt(inputValue)) {
      return this.setState({
        grumpyAllowanceApproved: true
      })
    } else {
      return this.setState({
        grumpyAllowanceApproved: false
      })
    }
  }

  render() {

    if (!this.props.grumpyApproved && !this.state.grumpyAllowanceApproved) {
      return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            this.props.approveGrumpyTransaction(this.state.grumpyToSwap)
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

                if (isNaN(this.input.value) ==false && this.props.account != null && this.input.value !="") {
                  let grumpyAmount = this.input.value.toString() 
                  this.setState({
                    grumpyToSwap: `${window.web3.utils.toWei(grumpyAmount, 'shannon')}`,// (grumpyAmount*10**9).toString(),
                    output: grumpyAmount / 100000
                  })
                  this.compareAllowanceToInput(this.input.value)
                }
                else if(this.props.account == null) {
                  this.setState({output: "Please Connect your Wallet"})
                }
                else{
                  this.setState({output: "Please Enter a Number"})
                }
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
              className="mt-2 mb-2 mr-4 btn-text"
              type="button"
              onClick={() => { this.maxApprovedGrumpy() }}
            >Max Approved</button>
            <button 
              disabled={!this.props.account}
              className="mt-2 mb-2 mr-4 btn-text"
              type="button"
              onClick={() => { this.maxSwapLimitGrumpy() }}
            >Max Swap Limit</button>
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
            <span className="float-left text-muted d-none d-sm-block">Exchange Rate</span>
            <span className="float-right text-muted">100k GRUMPY = 1 PAWTH</span>
          </div>
          {
            this.props.loading == false ? 
            <button disabled={!this.props.account} type="submit" className="btn pawth_color_2 btn-block btn-lg">Approve Grumpy</button>
            : <button disabled={!this.props.account} type="submit" className="btn pawth_color_2 btn-block btn-lg">Confirm in Wallet and Wait</button>
          }
          
          
        </form>
      );
    }
    else {
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
                if (isNaN(this.input.value) ==false && this.props.account != null && this.input.value !="") {
                  let grumpyAmount = this.input.value.toString() 
                  this.setState({
                    grumpyToSwap: `${window.web3.utils.toWei(grumpyAmount, 'shannon')}`,// (grumpyAmount*10**9).toString(),
                    output: grumpyAmount / 100000
                  })
                  this.compareAllowanceToInput(this.input.value)
                }
                else if(this.props.account == null) {
                  this.setState({output: "Please Connect your Wallet"})
                }
                else{
                  this.setState({output: "Please Enter a Number"})
                }
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
              className="mt-2 mb-2 mr-4 btn-text"
              type="button"
              onClick={() => { this.maxApprovedGrumpy() }}
            >Max Approved</button>
            <button 
              disabled={!this.props.account}
              className="mt-2 mb-2 mr-4 btn-text"
              type="button"
              onClick={() => { this.maxSwapLimitGrumpy() }}
            >Max Swap Limit</button>
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
            <span className="float-left text-muted d-none d-sm-block">Exchange Rate</span>
            <span className="float-right text-muted">100k GRUMPY = 1 PAWTH</span>
          </div>
          {
            this.props.loading == false ?
            <button disabled={!this.props.account} type="submit" className="btn pawth_color_2 btn-block btn-lg">Swap!</button>
            : <button disabled={!this.props.account} type="submit" className="btn pawth_color_2 btn-block btn-lg">Confirm in Wallet and Wait</button>
          }
          
        </form>
      );
    }
    
  }
}

export default SwapGrumpyForPawth;
