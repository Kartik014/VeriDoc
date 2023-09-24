const { ethers } = require('ethers');

const providerUrl = 'https://eth-sepolia.g.alchemy.com/v2/oLnh_W1cbrzoaSa9gk3Bqpwiw4fvyPfN'; // Replace with your Ethereum provider URL
const provider = new ethers.JsonRpcProvider(providerUrl);
const contractAddress = '0xa551F3FDEfDf7F66C8205Ba8Ca074bfEf6F0129b';
const wallet = new ethers.Wallet('c3ab60983a786b37decbbf6da84fadedb4c0d4e6e753baba82464f097ecb22cf', provider)
const contractABI = [
  {
    "inputs": [],
    "name": "getter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "setter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "constant": false
  }
];
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

exports.getValue = async (req, res) => {
  try {
    const Res = await contract.getter();
    const decimalString = Res.toString();
    res.status(200).json({
      status: 'success',
      data: decimalString
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      reason: error
    })
  }
}

exports.setValue = async (req, res) => {

  const { value } = req.body;
  try {
    const transaction = await contract.setter(3009);
    const txReceipt = await transaction.wait();
    const confirmedTx = await provider.waitForTransaction(txReceipt.hash)

    res.status(200).json({
      status: 'success',
      data: confirmedTx.hash
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      reason: error.message
    })
  }
}