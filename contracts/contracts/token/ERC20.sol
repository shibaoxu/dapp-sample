// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "./IERC20.sol";
import "../math/SafeMath.sol";

contract ERC20 is IERC20 {
  using SafeMath for uint256;

  mapping(address=>uint256) private _balance;
  mapping(address=> mapping(address=>uint256)) private _allowed;
  uint256 private _totalSupply;

  function totalSupply() public override view returns(uint256){
    return _totalSupply;
  }

  function balanceOf(address owner) public override view returns(uint256){
    return _balance[owner];
  }

  function allowance(address owner, address spender) public override view returns(uint256){
    return _allowed[owner][spender];
  }

  function transfer(address to, uint256 value) public override returns (bool){
    require(value<=_balance[msg.sender], "exceed balance.");
    require(to != address(0), "send token to nonexist address");
    _balance[msg.sender] = _balance[msg.sender].sub(value);
    _balance[to] = _balance[to].add(value);
    emit Transfer(msg.sender, to, value);
    return true;
  }
}
