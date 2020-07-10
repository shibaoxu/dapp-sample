// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import "./Escrow.sol";

// interface IERC20 {
//     function transfer(address to, uint256 value) external returns (bool);
//     function approve(address spender, uint256 value) external returns (bool);
//     function transferFrom(address from, address to, uint256 value) external returns (bool);
//     function totalSupply() external view returns (uint256);
//     function balanceOf(address who) external view returns (uint256);
//     function allowance(address owner, address spender) external view returns (uint256);
//     event Transfer(address indexed from, address indexed to, uint256 value);
//     event Approval(address indexed owner, address indexed spender, uint256 value);
// }
contract DAX {
    event TransferOrder(
        bytes32 _type,
        address indexed from,
        address indexed to,
        bytes32 tokenSymbol,
        uint256 quantity
    );

    enum OrderState {OPEN, CLOSED}

    struct Order {
        uint256 id;
        address owner;
        bytes32 orderType;
        bytes32 firstSymbol;
        bytes32 secondSymbol;
        uint256 quantiry;
        uint256 price;
        uint256 timestamp;
        OrderState state;
    }

    Order[] public buyOrders;
    Order[] public sellOrder;
    Order[] public closedOrder;

    uint256 public orderIdCounters;
    address public owner;
    address[] public whitelistedTokens;
    bytes32[] public whitelistedTokenSymbols;
    address[] public users;

    mapping(address => bool) public isTokenWhitelisted;
    mapping(bytes32 => bool) public isTokenSymbolWhitelisted;
    mapping(bytes32 => bytes32[]) public tokenPairs; //A token symbol pair made of 'FIRST' => 'SECOND
    mapping(bytes32 => address) public tokenAddressBySymbol; //根据Token Symbol获得Token合约地址
    mapping(uint256 => Order) public orderById;
    mapping(uint256 => uint256) public buyOrderIndexById;
    mapping(address => address) public escrowByUserAddress; //用户的资金托管合约地址

    modifier onlyOwner {
        require(msg.sender == owner, "只有owner才可以调用此函数");
        _;
    }

    fallback() external {
        revert();
    }

    constructor() public {
        owner = msg.sender;
    }

    /// @notice 只有把token加入到白名单才能进行交易
    /// @param _symbol Token符号，例如‘TOK'
    /// @param _token 要加入到白名单的Token合约地址，例如’TOK‘的合约地址
    /// @param _tokenPairSymbols 要加入到白名单的Token对，如果此参数为['BAT', 'HYDRO'], 则会被转化为['TOK', 'BAT'],['TOK', 'HYDRO']
    /// @param _tokenPairAddress token对所对应的token合约地址
    function whitelistToken(
        bytes32 _symbol,
        address _token,
        bytes32[] memory _tokenPairSymbols,
        address[] memory _tokenPairAddress
    ) public onlyOwner {}

    /// @notice 把token存入到账户对应的资金托管合约，用户必须先同意
    /// @param _token token的合约地址
    /// @param _amount token数量
    function depositTokens(address _token, uint256 _amount) public {}

    /// @notice 从个人资金托管合约中取出token
    function extractTokens(address _token, uint256 _amount) public {}

    /// @notice 创建一个市价订单
    /// @param _type 订单买卖方向， 'buy'或者'sell'
    /// @param _firstSymbol 要买或者卖的token符号
    /// @param _secondSymbol 结算的token符号
    /// @param _quantity 数量
    function marketOrder(
        bytes32 _type,
        bytes32 _firstSymbol,
        bytes32 _secondSymbol,
        uint256 _quantity
    ) public {}

    /// @notice 创建一个限价订单
    function limitOrder(
        bytes32 _type,
        bytes32 _firstSymbol,
        bytes32 _secondSymbol,
        uint256 _quantity,
        uint256 _pricePerToken
    ) public {}

    function sortIdsByPrice(bytes32 _type) public view returns (uint256[] memory){}

    function checkValidPair(bytes32 _firstSymbol, bytes32 _secondSymbol) public view returns (bool){}

    function getTokenPairs(bytes32 _token) public view returns(bytes32[] memory){}
}
