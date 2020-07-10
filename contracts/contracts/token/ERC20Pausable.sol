// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import "./ERC20.sol";
import "./Pausable.sol";

abstract contract ERC20Pausable is ERC20, Pausable {
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        require(!paused(), "ERC20Pausable: token transfer while paused");
    }
}
