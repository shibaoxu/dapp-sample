// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function totalSupply() external view returns (uint256);
    function balanceOf(address who) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Escrow {
  address public owner;

  modifier onlyOwner {
    require(msg.sender == owner, "You must be the owner to execute that function");
    _;
  }

  fallback () external {
    revert();
  }

  constructor(address _owner) public {
    require(_owner != address(0), "The owner address must be set.");
    owner = _owner;
  }

  function transferTokens(address _token, address _to, uint256 _amount) public onlyOwner{
    require(_token != address(0), "The token address must be set.");
    require(_to != address(0), "The receiver address must be set.");
    require(_amount >0, "You must special the amount of token to transfer.");
    require(IERC20(_token).transfer(_to, _amount), "The transfer must be successful");
  }

  function checkTokenBalance(address _token) public view returns(uint256){
    require(_token != address(0), "The token address must be set.");
    return IERC20(_token).balanceOf(address(this));
  }
}