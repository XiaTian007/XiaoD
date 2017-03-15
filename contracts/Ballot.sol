pragma solidity ^0.4.6;
contract Ballot
{
    struct Voter
    {
        bytes32 name;
        uint weight;
        bool voted;
        uint vote;
        uint givenRightTime;
        uint votetime;
    }

    struct Proposal
    {
        bytes32 name;
        uint voteCount;
        address account;
    }
    address public chairperson;

    event voteCast(address from, bytes32 proposal, uint voteTime);

    mapping(address => Voter) public voters;
    uint public votersNum;
    Proposal[] public proposals;
    uint public balance;

    function Ballot(bytes32[] proposalNames , address[] proposalAccounts, bytes32 chairpersonName)
    {
        chairperson = msg.sender;
        voters[chairperson].weight = 10;
        voters[chairperson].name = chairpersonName;
        voters[chairperson].voted = false;
        voters[chairperson].votetime = 0;
        voters[chairperson].givenRightTime = now;
        votersNum = 1;

        for (uint i = 0; i < proposalNames.length; i++)
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0,
                account: proposalAccounts[i],
            }));

    }

    function giveRightToVote(address voter,bytes32 voterName)
    {
        if (msg.sender != chairperson || voters[voter].voted)
            throw;
        voters[voter].weight = 1;
        voters[voter].voted = false;
        voters[voter].name = voterName;
    		voters[voter].votetime = 0;
    		voters[voter].givenRightTime = now;

		    votersNum += 1;
    }

    function vote(uint proposalIndex)
    {
        Voter sender = voters[msg.sender];

        if (sender.voted) throw;

        sender.voted = true;
        sender.vote = proposalIndex;
        sender.votetime = now;
        proposals[proposalIndex].voteCount += sender.weight;

        voteCast(msg.sender, proposals[proposalIndex].name, now);
    }

    function winningProposal() constant
            returns (uint winningProposal)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++)
        {
            if (proposals[p].voteCount > winningVoteCount)
            {
                winningVoteCount = proposals[p].voteCount;
                winningProposal = p;
            }
        }
    }

    function sendRewards(address winner) {
        //proposal winner = proposals[winningProposal].account;

    }
}
