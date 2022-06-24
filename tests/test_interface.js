
(async function(){

	var ethers = require('ethers');
	var ziel = require('../ziel');
	var axios = require('axios');	

	async function get_abi(address, networks) {
		var network = (networks == 'homestead'? '': '-'+ networks);
		var host = 'https://api'+ network +'.etherscan.io';
		var url = '/api?module=contract&action=getabi&address='
			+ address +'&apikey='+ ziel.sZielEthScan;
		console.log(host + url);
		const response = await axios.get(host + url)
		return response.data.result
	}

	async function get_provider(network) {
		let provider = new ethers.providers.InfuraProvider(network, ziel.sZielInfura);
		return provider;
	}
	
	async function get_contract(address, network) {
/*
// Read-Only; By connecting to a Provider, allows:
// - Any constant function
// - Querying Filters
// - Populating Unsigned Transactions for non-constant methods
// - Estimating Gas for non-constant (as an anonymous sender)
// - Static Calling non-constant methods (as anonymous sender)
const erc20 = new ethers.Contract(address, abi, provider);
// Read-Write; By connecting to a Signer, allows:
// - Everything from Read-Only (except as Signer, not anonymous)
// - Sending transactions for non-constant functions
const erc20_rw = new ethers.Contract(address, abi, signer);
https://docs.ethers.io/v5/api/contract/example/#example-erc-20-contract--connecting-to-a-contract
*/		
		let abi = await get_abi(address, network);
		let provider = new ethers.providers.InfuraProvider(network, ziel.sZielInfura);
		let contract = new ethers.Contract(address, abi, provider);
		return contract;
	}

	async function get_wallet(network) {
		let provider = new ethers.providers.InfuraProvider(network, ziel.sZielInfura);
		let wallet = new ethers.Wallet(ziel.sZielPrivate1, provider);
		return wallet;
	}

	let sNetwork = 'ropsten'; //homestead
	let sAddress = '0xf1e92ECF89deC8477f41c996140A94E5B66d4870'; //'0xdD60E5c442bcD5fbaB61C7B5F03Ac3C4d5E72ec4';
	let contract = await get_contract(sAddress, sNetwork);
	let wallet = await get_wallet(sNetwork);
	let provider = await get_provider(sNetwork);

/*
let gas_limit = 5000000 //"0x100000" // Gas Limit & Usage by Txn: 5,000,000 | 21,000 (0.42%) 
let gas_price = 33000000000 //22500000000 // fast-33 average-30 slow-22.5 // 0.0000001 Ether (100 Gwei) // gas calculator

https://docs.ethers.io/v5/api/utils/transactions/
*/
	let oTx = {
		to: sAddress,
		gasLimit: ethers.utils.hexlify(210000),
		gasPrice: 33000000000, //await provider.getGasPrice(),
		nonce: await provider.getTransactionCount(wallet.address, 'latest'),
		value: 1
	}
	

	let buy = new Promise(async (resolve, reject) => {
		console.log(oTx);
		//let log = provider.sendTransaction(sign);
		
		let ser = await wallet.signTransaction(oTx).then(ethers.utils.serializeTransaction(oTx));
  console.log(ser);
		resolve(ser);
	}).then(function(ser){
		
		let log = provider.sendTransaction(ser);
		return log;
		
/*

  // pass the raw transaction hash to the "eth_sendRawTransaction" endpoint
  let host = "https://api-ropsten.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex="+ log +"&apikey="+ ziel.sZielEthScan;
	const response = await axios.get(host)
		log = response.data.result;
*/
/*
		let sign = await wallet.signTransaction(oTx)
	.then(async function(sign) {
	
		
  	
  
		
		console.log(sign);
		let ser = await ethers.utils.serializeTransaction(sign);
		console.log(ser);
		return ser;
	}).then(function(ser){

		let log = provider.sendTransaction(sign);
		console.log(ser);
		return log;
	});
	*/
		
  /*
		console.log('Raw txhash string ' + rawTransaction);

		let url = "https://api-ropsten.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex="+  +"&apikey="+ ziel.sZielEthScan;
		const response = await axios.get(host + url)
		consoe.log(response.data.result);
		
  // pass the raw transaction hash to the "eth_sendRawTransaction" endpoint
  let gethProxy = await fetch(``);    
  let response = await gethProxy.json();    
     
  */
		
	})
	.then(async function(tx){
		console.log(tx);
		let response = await tx.wait();
		console.log(response);
	})
	.catch(err => console.log(err));

	
//return;

// Send the transaction

/*
let sendTransactionPromise = wallet.sendTransaction(transaction);

sendTransactionPromise.then((tx) => {
	console.log(tx);
})
*/
	
/*
*/
/*
let buy = new Promise((resolve, reject) => {
	let tx = contract.buyTokens("0x75d7e864E406ebef75e5102004EdbB3a5AF95c03", 40);
	resolve(tx);	
});

buy.then(function(res){
	console.log(res);
}, (err) => {
	console.log(err, "failure callback");
})
*/

})()