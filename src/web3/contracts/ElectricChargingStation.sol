pragma solidity ^0.4.25;


contract ElectricChargingStation{
    bytes32 public reqId;
    address[] public _payees;
    int256[] public _expectedAmounts;

    address constant contractAddress = 0x967c269f373652fc7a4ef70df7781b509fa4f117;
    address constant electricCompanyAccount = 0xc582Ec7Fb245c6E55bd26b7F968eF5028218AC3B;
    
        function createRequest(
        int256 _amount
        )
        public 
         
    {
        address _creator = msg.sender;
        address _payer = msg.sender;
        _payees.push(0xc582Ec7Fb245c6E55bd26b7F968eF5028218AC3B);
        _expectedAmounts.push(_amount);
        string memory _data = "null";
        
        requestNetwork c = requestNetwork(contractAddress);
        reqId = c.createRequest(_creator, _payees, _expectedAmounts, _payer, _data);
    }
}

contract requestNetwork{
        function createRequest(
        address     _creator,
        address[]   _payees,
        int256[]    _expectedAmounts,
        address     _payer,
        string      _data)
        external
        returns (bytes32 requestId) ;
    
}