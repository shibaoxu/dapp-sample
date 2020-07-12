
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "./ERC20.sol";
contract ERC20Factory {
    mapping(address => address[]) public created;

    function createERC20(
        uint256 initialAmount,
        string memory name,
        uint8 decimal,
        string memory symbol
    ) public returns (address) {
        ERC20 newToken = (new ERC20(name, symbol, initialAmount, decimal));
        created[msg.sender].push(address(newToken));
        newToken.transfer(msg.sender, initialAmount);
        return address(newToken);
    }

    function _codeAt(address addr)
        internal
        view
        returns (bytes memory outputCode)
    {
        assembly {
            // solhint-disable-line no-inline-assembly
            let size := extcodesize(addr)
            outputCode := mload(0x40)
            mstore(
                0x40,
                add(outputCode, and(add(add(size, 0x20), 0x1f), not(0x1f)))
            )
            mstore(outputCode, size)
            extcodecopy(addr, add(outputCode, 0x20), 0, size)
        }
    }

    function getCreated(address addr) public view returns(address[] memory) {
        return created[addr];
    }
}
