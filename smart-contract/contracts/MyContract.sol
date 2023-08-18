// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public myNumber;

    function setNumber(uint256 _value) public {
        myNumber = _value;
    }

    function getNumber() public view returns (uint256) {
        return myNumber;
    }
}
