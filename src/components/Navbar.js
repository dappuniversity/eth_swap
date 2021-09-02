import React, { Component } from 'react'
import Identicon from 'identicon.js';
import "./App.css";

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar fixed-top flex-md-nowrap p-0">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Grumpy/Pawth Swap
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account" className="black_font">Your eth address is: {this.props.account}</small>
            </small>


          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
