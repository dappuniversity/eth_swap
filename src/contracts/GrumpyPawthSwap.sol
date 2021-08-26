pragma solidity ^0.5.0;

import "./Grumpy.sol";
import "./Pawth.sol";

contract GrumpyPawthSwap {
  string public name = "Grumpy Pawth Swap";
  Grumpy public grumpy;
  Pawth public pawth;
  uint public rate = 100000;

  event PawthSwappedForGrumpy(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event GrumpySwappedForPawth(
    address account,
    address grumpy,
    uint amount,
    uint rate
  );

  constructor(Grumpy _grumpy, Pawth _pawth) public {
    grumpy = _grumpy;
    pawth = _pawth;
  }

  function swapPawthForGrumpy(uint _amount) public payable {
    // User can't sell more tokens than they have
    require(pawth.balanceOf(msg.sender) >= _amount);

    // Send pawth to the swap
    pawth.transferFrom(msg.sender, address(this), _amount);

    // Calculate the amount of grumpy to redeem
    uint grumpyAmount = _amount * rate;

    // Require that GrumpyPawthSwap has enough Grumpy
    require(grumpy.balanceOf(address(this)) >= grumpyAmount);

    // Perform swap
    grumpy.transfer(msg.sender, grumpyAmount);

    // Emit an event
    emit PawthSwappedForGrumpy(msg.sender, address(pawth), _amount, rate);
  }

  function swapGrumpyForPawth(uint _amount) public {
    // User can't sell more tokens than they have
    require(grumpy.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint pawthAmount = _amount / rate;

    // Require that GrumpyPawthSwap has enough Pawth
    require(pawth.balanceOf(address(this)) >= pawthAmount);

    // Perform sale
    grumpy.transferFrom(msg.sender, address(this), _amount);
    pawth.transfer(msg.sender, pawthAmount);

    // Emit an event
    emit GrumpySwappedForPawth(msg.sender, address(grumpy), _amount, rate);
  }

}
