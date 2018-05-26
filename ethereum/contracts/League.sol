pragma solidity ^0.4.17;

contract League {
    address[] public teams;
    address public manager;
    uint public buyInAmount;
    uint public leagueSize;


    function League(address creator, uint entryFee, uint size) public {
        manager = creator;
        buyInAmount = entryFee;
        leagueSize = size;
    }

    function enterLeague() public payable {
        require(msg.value == buyInAmount);
        teams.push(msg.sender);
    }

    function getTeams() public view returns (address[]){
        return teams;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
