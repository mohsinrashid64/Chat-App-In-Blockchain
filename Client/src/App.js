import React, { useState } from 'react';
import Web3 from 'web3';




const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'; // Update with your actual contract address
const abi = [
  {
    "_format": "hh-sol-artifact-1",
    "contractName": "MyContract",
    "sourceName": "contracts/MyContract.sol",
    "abi": [
      {
        "inputs": [],
        "name": "getNumber",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "myNumber",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "setNumber",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b5061017f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806323fd0e40146100465780633fb5c1cb14610064578063f2c9ecd814610080575b600080fd5b61004e61009e565b60405161005b91906100d0565b60405180910390f35b61007e6004803603810190610079919061011c565b6100a4565b005b6100886100ae565b60405161009591906100d0565b60405180910390f35b60005481565b8060008190555050565b60008054905090565b6000819050919050565b6100ca816100b7565b82525050565b60006020820190506100e560008301846100c1565b92915050565b600080fd5b6100f9816100b7565b811461010457600080fd5b50565b600081359050610116816100f0565b92915050565b600060208284031215610132576101316100eb565b5b600061014084828501610107565b9150509291505056fea2646970667358221220cbc47be1875f7ab929ec43ef81e7b712e422c0cebba39ca2a6bedad73c26a3cf64736f6c63430008130033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100415760003560e01c806323fd0e40146100465780633fb5c1cb14610064578063f2c9ecd814610080575b600080fd5b61004e61009e565b60405161005b91906100d0565b60405180910390f35b61007e6004803603810190610079919061011c565b6100a4565b005b6100886100ae565b60405161009591906100d0565b60405180910390f35b60005481565b8060008190555050565b60008054905090565b6000819050919050565b6100ca816100b7565b82525050565b60006020820190506100e560008301846100c1565b92915050565b600080fd5b6100f9816100b7565b811461010457600080fd5b50565b600081359050610116816100f0565b92915050565b600060208284031215610132576101316100eb565b5b600061014084828501610107565b9150509291505056fea2646970667358221220cbc47be1875f7ab929ec43ef81e7b712e422c0cebba39ca2a6bedad73c26a3cf64736f6c63430008130033",
    "linkReferences": {},
    "deployedLinkReferences": {}
  }
  
];

function App() {
  const [_number, _setNumber] = useState('');
  const [_message, _setMessage] = useState('');

  const hardhatNodeUrl = 'http://127.0.0.1:8545/';
  const web3 = new Web3(new Web3.providers.HttpProvider(hardhatNodeUrl));
  const contract = new web3.eth.Contract(abi, contractAddress); // Create the contract instance here


  const connectToWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('No Ethereum wallet found.');
    }
  };
  const getNumberFromContract = async () => {
    try {
      const num = await contract.methods.getNumber().call();
      _setMessage(`Number retrieved: ${num.toString()}`);
    } catch (error) {
      console.error('Error fetching number:', error);
    }
  };

  const setNumberInContract = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await contract.methods.setNumber(_number).send({ from: accounts[0] });
      _setMessage(`Number set to: ${_number}`);
    } catch (error) {
      console.error('Error setting number:', error);
    }
  };

  return (
    <div className="App">
      {console.log("Contract",contract)}
      {console.log("Web3",web3)}
      <h1>Interact with MyContract</h1>
      <button onClick={connectToWallet}>Connect to Wallet</button>
      <div>
        <button onClick={getNumberFromContract}>Get Number</button>
        <button onClick={setNumberInContract}>Set Number</button>
        <input
          type="number"
          placeholder="Enter a number"
          value={_number}
          onChange={(e) => _setNumber(e.target.value)}
        />
      </div>
      <p>{_message}</p>
    </div>
  );
}

export default App;