pragma solidity ^0.4.17;
/* idea: implement way for teams to veto or approve trades or leage votes */

contract LeagueFactory {
    address[] public deployedLeagues;

    function createLeague(uint entryFee, uint size, uint firstPot, uint secondPot, uint thirdPot) {
        address newLeague = new League(msg.sender, uint entryFee, uint size, uint firstPot, uint secondPot, uint thirdPot);
        deployedLeagues.push(newLeague);
    }

    function getDeployedLeagues() public view returns (address[]) {
        return deployedLeagues;
    }
}

contract League {
    mapping(address => bool) public teams;
    address public manager;

    uint public buyInAmount;
    uint public leagueSize;
    uint teamCount;

    uint public firstPlacePot;
    uint public secondPlacePot;
    uint public thirdPlacePot;

    constructor(address creator, uint entryFee, uint size, uint firstPot, uint secondPot, uint thirdPot) public {
        manager = creator;
        buyInAmount = entryFee;
        leagueSize = size;

        firstPlacePot = firstPot;
        secondPlacePot = secondPot;
        thirdPlacePot = thirdPot;
    }

    function enterLeague() public payable {
        require(msg.value == buyInAmount);
        require(!teams[msg.sender]);

        // adds a new key to the mapping equal to msg.sender and set val to true
        // a mapping is better because the search time is constant for the entire mapping.
        teams[msg.sender] = true;
        teamCount++;
    }

    function pickWinners(address firstPlaceAddr, address secondPlaceAddr, address thirdPlaceAddr) public restricted payable {
        require(teams[firstPlaceAddr] && teams[secondPlaceAddr] && teams[thirdPlaceAddr]);

        firstPlaceAddr.transfer(firstPlacePot);
        secondPlaceAddr.transfer(secondPlacePot);
        thirdPlaceAddr.transfer(thirdPlacePot);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
