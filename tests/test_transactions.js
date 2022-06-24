(async function(){

const ethers = require('ethers');
const path = require('path')
const fs = require('fs')
const ziel = require('../ziel');

let sNetwork = 'ropsten'; //homestead
let provider = new ethers.providers.InfuraProvider(sNetwork, ziel.sZielInfura);
//let wallet = new ethers.Wallet(ziel.sZielPrivate1, provider);

let receiverAddress1 = "0x0de710b8766d6eF045D6b3329188BF40DB95530b";
let receiverAddress2 = "0x75d7e864E406ebef75e5102004EdbB3a5AF95c03";
let receiverAddress3 = "0xe9884777D9F377530788CeE12A40269f812cF30a";
let receiverAddress4 = "0x8111cEe45aD080F9De470bB311a8EC024AdCfa2E";
let receiverAddress5 = "0xA9b1fd53086E67BA34F4945353b564E63a7FeBb0";
let receiverAddress6 = "0x73aB2b105Bbf32F1976AF4F2545736C26E73E3C3";
//let amountInEther = "0.001";

let gas_limit = 5000000 //"0x100000" // Gas Limit & Usage by Txn: 5,000,000 | 21,000 (0.42%) 
let gas_price = 250000000000 //22500000000 // fast-33 average-30 slow-22.5 // 0.0000001 Ether (100 Gwei) // gas calculator

/*
Value: 1 wei ($0.00)
Transaction Fee: 0.0021 Ether ($0.00)
Gas Price: 0.0000001 Ether (100 Gwei)
Gas Limit & Usage by Txn: 5,000,000 | 21,000 (0.42%)
Gas Fees: Base: 0.104296913 Gwei |Max: 100 Gwei |Max Priority: 100 Gwei
Burnt & Txn Savings Fees: 🔥 Burnt: 0.000002190235173 Ether ($0.00) 💸 Txn Savings: 0 Ether ($0.00)
*/
/*
const sGasPrice = await provider.getGasPrice().then((currentGasPrice) => {
	//console.log(BigNumber.toString(currentGasPrice));
	let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice))
	console.log(`gas_price: ${gas_price}`)
});

return console.log('##');
*/
	
let txFromAddress = receiverAddress2;
let txToAddress = receiverAddress3;
let private_key = ziel.sZielPrivate2

let wallet = new ethers.Wallet(private_key)
let walletSigner = wallet.connect(provider)

/*
https://docs.ethers.io/v5/api/utils/transactions/
*/
const tx = {
	from: txFromAddress,
	to: txToAddress,
	value: 1, //ethers.utils.parseEther(send_token_amount),
	nonce: provider.getTransactionCount(
		txFromAddress,
		"latest"
	),
	gasLimit: ethers.utils.hexlify(gas_limit),
	gasPrice: gas_price,
}
console.dir(tx)


	
try {
	walletSigner.sendTransaction(tx)
	.then(async function(tx){
		console.log(tx);

		fs.appendFile(path.resolve(__dirname, "./logs", "transactions.json"), //path.resolve(buildPath, sContractName + ".json"),  
			"\n\n_____\n"+ new Date().toLocaleString() +"\n\n"+ JSON.stringify(tx, null, 2), 
			err => {
				if (err) return console.error(err)
			});		

		return tx;
	})
	.then(async function(tx){
		let response = await tx.wait();
		console.log(response);

		fs.appendFile(path.resolve(__dirname, "./logs", "transactions.json"), //path.resolve(buildPath, sContractName + ".json"),  
			"\n\n_____\n"+ new Date().toLocaleString() +"\n\n"+ JSON.stringify(response, null, 2), 
			err => {
				if (err) return console.error(err)
			});

	})
	.catch(async function(error){
		console.log(error)
		
		fs.appendFile(path.resolve(__dirname, "./logs", "transactions.json"), //path.resolve(buildPath, sContractName + ".json"),  
			"\n\n_____ERROR\n"+ new Date().toLocaleString() +"\n\n"+ JSON.stringify(error, null, 2), 
			err => {
				if (err) return console.error(err)
			});
	});
} catch (error) {
	console.log(error)

	fs.appendFile(path.resolve(__dirname, "./logs", "transactions.json"), //path.resolve(buildPath, sContractName + ".json"),  
		"\n\n_____ERROR\n"+ new Date().toLocaleString() +"\n\n"+ JSON.stringify(error, null, 2), 
		err => {
			if (err) return console.error(err)
		});
}
	
})()


/*
1-2
'0x616edd746275233577f645217ba5daf4a82e694cf9275cd298f7fb824779a0d8'
1-3
'0x4aedab7648dd5e24e878dd7a20b66ad003e8cba49ee0801c07cc37f3af50523b'
1-4
'0x5310612f16d25bc26fd941307d4f2856a0d2c5670e0cdccf99771b42d1e704c4'
2-4
'0x86f04775943e8bb59937ad5a01aa6fda2768a3f446659e62c00a350a77a8d800'
3-4
'0xcc516f94015124ad3e7d5d782f1ffb13f2ce3ab252e6683231aad31ca3b060bd'
3-4
'0xaba9fb97aa5017c8f3154d516048ffa62b6d3d997f7d69ab65dda77a8fecee43'
1-4
'0x9e86b53be4a9c1f1adcf9b757553966d0ea9866b980ae6739f66c2928d75a4e5'
2-4
'0xda5fc905c209ecbbb65ab86c9c5fed7bd8e37d9cdf390f97303b679e057ecabd'
3-4
'0x7671a27009a6d591670b15b60a3e69fb938c967f080de22e93acfb1ca3e6eaf8'
5-6
'0xe2d702b583ecef85e860ee46366a1dccb05ab81247d7ecc3194d6730292405b4'
5-6 05:19:55 - 05:52:00 = 33minute
'0x9817bebe58955bbe7fa886bf123951e620a04dea4cb5a9d9adfac11030c8fbcd'
5-6 - await
'0x9eab2b5f739c775cc05312ad70332e634494a1d08840f4a007b60a0ef0f13b17'
*/


