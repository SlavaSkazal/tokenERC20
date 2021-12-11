// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.3;

contract myTokenERC20 {
    uint private totalSupply_;
    address private owner;
    string private constant name = "my token ERC20";
    string private constant symbol = "MFT";
    uint8 private constant decimals = 18;
    
    mapping(address => uint) private balances;
    mapping(address => mapping (address => uint)) private allowance_;

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function mint(address to, uint value) public onlyOwner {
        require(totalSupply_ + value >= totalSupply_ && balances[to] + value >= balances[to]);

        balances[to] += value;
        totalSupply_ += value;  
        emit Transfer(owner, to, value);
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function totalSupply() public view returns (uint) {
        return totalSupply_;
    }  

    function transfer(address to, uint amount) public returns (bool) {
        require(amount <= balances[msg.sender]);

        balances[msg.sender] = balances[msg.sender] - amount;
        balances[to] = balances[to] + amount;
        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function approve(address delegate, uint amount) public returns (bool) {
        allowance_[msg.sender][delegate] = amount;
        emit Approval(msg.sender, delegate, amount);

        return true;
    }

    function allowance(address owner, address delegate) public view returns (uint) {
        return allowance_[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint amount) public returns (bool) {
        require(amount <= balances[owner]);
        require(amount <= allowance_[owner][msg.sender]);

        balances[owner] = balances[owner] - amount;
        allowance_[owner][msg.sender] = allowance_[owner][msg.sender] - amount;
        balances[buyer] = balances[buyer] + amount;
        emit Transfer(owner, buyer, amount);

        return true;
    }
}