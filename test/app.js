var accounts;
var account;
var BallotAddress = "0xa6501f627f29de0eac1166f318449215e91a38d8";

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshAccount() {
  var ballot = Ballot.at(BallotAddress);

  ballot.proposals.call(0).then(function(proposal){
    console.log(proposal[1].valueOf());
  });
  ballot.votersNum.call().then(function(votersNum){
    console.log("voters number is " + votersNum.valueOf());
  });

  ballot.voters.call(accounts[0]).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = web3.toUtf8(value[0]).valueOf();
    console.log(value[2]);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function giveRightToVote() {
  var BallotInstance = Ballot.deployed();

  var name = document.getElementById("name").value;
  var address = document.getElementById("address").value;

  setStatus("Initiating transaction... (please wait)");


  BallotInstance.giveRightToVote(address, name, {from: account, gas:4700000}).then(function() {
    setStatus("Transaction complete!");
    refreshAccount();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

function vote() {
  var BallotInstance = Ballot.deployed();

  var voteIndex = document.getElementById("voteIndex").value;
  setStatus("Initiating transaction... (please wait)");
  BallotInstance.voters.call(accounts[2]).then(function(value){
    if (value[2] == false){
      BallotInstance.vote(voteIndex, {from:accounts[2], gas:4700000}).then(function() {
        setStatus("Vote success!");
        refreshAccount();
        winningProposal();
      }).catch(function(e) {
        console.log(e);
        setStatus("Error Vote; see log.");
      });
    }else {
      setStatus("Already voted!");
    }
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
}

function winningProposal() {
  var ballot = Ballot.deployed();

  ballot.winningProposal.call().then(function(proposalIndex){
    ballot.proposals.call(proposalIndex).then(function(proposal){
      var winningProposal_element = document.getElementById("winningProposal");
      var winningPoint_element = document.getElementById("winningPoint");
      winningProposal_element.innerHTML = web3.toUtf8(proposal[0]).valueOf();
      winningPoint_element.innerHTML = proposal[1].valueOf();
    })
  }).catch(function(e){
    console.log(e);
    setStatus("Error getting winning proposal!;see log.");
  })
}

function createContract() {

  var proposalNames = ['huangDY', 'lv', 'hei'];
  var address = "0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8";
  var name = "Jiang";

  Ballot.new(proposalNames, name, address).then(function(instance){
    console.log(instance.address);
  }).catch(function(e){
    console.log(e);
  })
}


window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    accounts = accs;
    account = accounts[0];

    refreshAccount();
    winningProposal();
  });
}
