var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
var from = web3.eth.coinbase;
web3.eth.defaultAccount = from;
var fs = require("fs");
str = "";
var buff = fs.readFileSync('./contracts/Ballot.sol', 'utf-8');
str = buff.toString()
str.replace(/(\n(?=(\n+)))+/g, '')
calcCompiled = web3.eth.compile.solidity(str);
console.log(calcCompiled);


abiDefinition = calcCompiled["info"]["abiDefinition"];
calcContract = web3.eth.contract(abiDefinition);
deployCode = calcCompiled["code"];

//2.2 部署者的地址，当前取默认账户的第一个地址。
deployeAddr = web3.eth.accounts[0];

myContractReturned = calcContract.new({
    data: deployCode,
    from: deployeAddr
}, function(err, myContract) {
    if (!err) {
        // 注意：这个回调会触发两次
        //一次是合约的交易哈希属性完成
        //另一次是在某个地址上完成部署

        // 通过判断是否有地址，来确认是第一次调用，还是第二次调用。
        if (!myContract.address) {
            console.log("contract deploy transaction hash: " + myContract.transactionHash) //部署合约的交易哈希值

            // 合约发布成功后，才能调用后续的方法
        } else {
            console.log("contract deploy address: " + myContract.address) // 合约的部署地址

            //使用transaction方式调用，写入到区块链上
            myContract.add.sendTransaction(1, 2, {
                from: deployeAddr
            });

            console.log("after contract deploy, call:" + myContract.getCount.call());
        }

        // 函数返回对象`myContractReturned`和回调函数对象`myContract`是 "myContractReturned" === "myContract",
        // 所以最终`myContractReturned`这个对象里面的合约地址属性也会被设置。
        // `myContractReturned`一开始返回的结果是没有设置的。
    } else {
        console.log(err)
    }
});
//注意，异步执行，此时还是没有地址的。
console.log("returned deployed didn't have address now: " + myContractReturned.address);