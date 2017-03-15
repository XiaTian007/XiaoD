module.exports = function(deployer) {
  var proposalNames = ['huangDY', 'lvDY', 'heiDY'];
  var address = ["0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8","0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8","0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8"];
  var name = "Xia";

  deployer.deploy(Ballot, proposalNames, address, name).then(function(){
    console.log(Ballot.deployed().address);
  });

};
