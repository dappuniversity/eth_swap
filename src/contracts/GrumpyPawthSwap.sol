pragma solidity ^0.5.0;

import "./Grumpy.sol";
import "./Pawth.sol";

contract GrumpyPawthSwap {
    string public name = "Grumpy Pawth Swap";
    Grumpy public grumpy;
    Pawth public pawth;
    uint256 public rate = 100000;
    address ownerAddress = 0x971dB08176bba44e7D5D0733D9f1127684033E47;
    bool public canSwap = true;

    event PawthSwappedForGrumpy(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event GrumpySwappedForPawth(
        address account,
        address grumpy,
        uint256 amount,
        uint256 rate
    );

    constructor(Grumpy _grumpy, Pawth _pawth) public {
        grumpy = _grumpy;
        pawth = _pawth;
    }

    function canSwap(bool _toggle) public {
        require(
            msg.sender == ownerAddress,
            "Sender is not permitted to toggle this function."
        );
        canSwap = _toggle;
    }

    function swapPawthForGrumpy(uint256 _amount) public {
        require(
            msg.sender == ownerAddress,
            "You are not permitted to perform a swap in this direction"
        );

        require(canSwap == true, "Swap is disabled.");
        // User can't sell more tokens than they have
        require(pawth.balanceOf(msg.sender) >= _amount);

        // Send pawth to the swap
        pawth.transferFrom(msg.sender, address(this), _amount);

        // Calculate the amount of grumpy to redeem
        uint256 grumpyAmount = _amount * rate;

        // Require that GrumpyPawthSwap has enough Grumpy
        require(grumpy.balanceOf(address(this)) >= grumpyAmount);

        // Perform swap
        grumpy.transfer(msg.sender, grumpyAmount);

        // Emit an event
        emit PawthSwappedForGrumpy(msg.sender, address(pawth), _amount, rate);
    }

    function swapGrumpyForPawth(uint256 _amount) public {
        require(canSwap == true, "Swap is disabled.");
        // User can't sell more tokens than they have
        require(grumpy.balanceOf(msg.sender) >= _amount);

        // Calculate the amount of Pawth to redeem
        uint256 pawthAmount = _amount / rate;

        // Require that GrumpyPawthSwap has enough Pawth
        require(pawth.balanceOf(address(this)) >= pawthAmount);

        // Perform swap
        grumpy.transferFrom(msg.sender, address(this), _amount);
        pawth.transfer(msg.sender, pawthAmount);

        // Emit an event
        emit GrumpySwappedForPawth(msg.sender, address(grumpy), _amount, rate);
    }

    function reclaim_all_pawth_tokens() public {
        require(
            msg.sender == ownerAddress,
            "You are not permitted to send pawth to the development walle."
        );
        uint256 all_pawth_remaining = pawth.balanceOf(address(this));
        pawth.transfer(ownerAddress, all_pawth_remaining);
    }

    function reclaim_all_grumpy_tokens() public {
        require(
            msg.sender == ownerAddress,
            "You are not permitted to send grumpy to the development wallet."
        );
        uint256 all_grumpy_remaining = grumpy.balanceOf(address(this));
        grumpy.transfer(ownerAddress, all_grumpy_remaining);
    }
}
