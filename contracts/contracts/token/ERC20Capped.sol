// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "./ERC20.sol";

abstract contract ERC20Capped is ERC20 {
    uint256 private _cap;

    constructor(uint256 cap) public{
        require(cap > 0, "ERC20Capped: cap is 0");
        _cap = cap;
    }

    function cap() public view returns(uint256){
        return _cap;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override{
        super._beforeTokenTransfer(from, to, amount);
        if (from == address(0)){
            require(totalSupply() + amount <= _cap, "ERC20Capped: cap execeed");
        }
    }
}