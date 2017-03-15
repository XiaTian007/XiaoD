# XiaoD
A safe information publish platform based on solidity

## Install truffle 

```
 sudo npm install -g truffle 
```

## Prepare private networks

 follow [this](https://github.com/cryptape/ethereum-bootstrap)

 ## Test

  - start geth private networks
  - unlock default account `personal.unlockAccount(eth.accounts[0],"your password",10000)`
  - in your clone file ,run
  ```
     $ truffle compile
     $ truffle migrate
     $ truffle serve
  ```