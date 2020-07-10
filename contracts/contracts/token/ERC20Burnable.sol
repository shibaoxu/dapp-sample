// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "./ERC20.sol";

abstract contract ERC20Burnable is ERC20 {
    function burn(uint256 amount) public virtual{
        _burn(msg.sender, amount);
    }

    function burnFrom(address account, uint256 amount) public virtual{
        uint256 decreasedAllowance = allowance(account, msg.sender);

        require(decreasedAllowance >= amount, "ERC20Burnable: burn amount exceeds allowance");
        _approve(account, msg.sender, decreasedAllowance - amount);
        _burn(account, amount);
    }
}