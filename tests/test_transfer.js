(async function(){

	var ethers = require('ethers');
	var ziel = require('../ziel');

let sNetwork = 'ropsten'; //homestead
let provider = new ethers.providers.InfuraProvider(sNetwork, ziel.sZielInfura);
let wallet = new ethers.Wallet(ziel.sZielPrivate1, provider);

let receiverAddress2 = "0x75d7e864E406ebef75e5102004EdbB3a5AF95c03";
let receiverAddress3 = "0xe9884777D9F377530788CeE12A40269f812cF30a";
let receiverAddress4 = "0x8111cEe45aD080F9De470bB311a8EC024AdCfa2E";
let amountInEther = "0.001";

let tx = {
	to: receiverAddress4,
	// Convert currency unit from ether to wei
	value: ethers.utils.parseEther(amountInEther)
}

const tx2 = {
  from: "0x0de710b8766d6eF045D6b3329188BF40DB95530b",
  to: receiverAddress4,
  value: ethers.utils.parseEther(amountInEther),
  //nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
  //gasLimit: ethers.utils.hexlify(gas_limit), // 100000
  //gasPrice: gas_price,
}

// Send a transaction
wallet.sendTransaction(tx2)
.then((txObj) => {
    console.log(txObj)                                                                                                     
		//txHash 0x78d811cd479820d427a7adec8d268baace37c620428eaae9c34829736584f9a8 
		//txHash 0xd194530643144d4819390fa2d1a483988a322e12cfd26860a602a595ac39fc91 // 0.5
		//txHash 0xe0ab0368c6e54338d9331c9608887e08037c786969e9f9262dd55e0eb100774b // 0.1
		//txHash 0x3eb69da1e9602cd00cce1765add1a26a0eba3087d5645ec661f6e33c4be6f6c6 // 1 wei
		// 0x47c1fb9bacfbc75d6526f89c8f4317b871d6bdf5ab3dcd7e48c1cadd8e1d3d47
		// 0x186e74f74a9bce2ae6727999894b8e553f39825ec2300bea763038331387dd1a

		// 0x2a6ac54ea8b073a6fadd74f1321c0ff7768007e03588b46824024b2ae370f5ee 
		// '0xa1ffcdc97efd12c355c08c46336cacd768f08d78c60e129e53cf0cfdb0986b80', # 4
		// '0x8d030cab41b178157a8ccb396814406d93bea1eb87e5ad71e055713a1b70ae6e', # 3
		// '0x2cd67a32efc29b4f6ea7f821815d182e65c629a085fafe372386d4f1f2dd23dd', # 1 - 4
	
/*
{ type: 2,
  chainId: 3,
  nonce: 44,
  maxPriorityFeePerGas: BigNumber { _hex: '0x9502f900', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x9502f90e', _isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0x5208', _isBigNumber: true },
  to: '0x8111cEe45aD080F9De470bB311a8EC024AdCfa2E',
  value: BigNumber { _hex: '0x01', _isBigNumber: true },
  data: '0x',
  accessList: [],
  hash:
   '0x70dc91b11694a959c0ab15317be3b91d25284ada655983138f46df7a2e96bffc',
  v: 0,
  r:
   '0x040fbaad5ba434c8ff2fe310e8e751efb03243be4173932ce7f8ad7fd20e4397',
  s:
   '0x296fe47570b437ac4efb40463b1ca60c71f0e7f878450d6cfe84815abfbfb937',
  from: '0x0de710b8766d6eF045D6b3329188BF40DB95530b',
  confirmations: 0,
	
	W
{ type: 2,
  chainId: 3,
  nonce: 45,
  maxPriorityFeePerGas: BigNumber { _hex: '0x9502f900', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x9502f914', _isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0x5208', _isBigNumber: true },
  to: '0x8111cEe45aD080F9De470bB311a8EC024AdCfa2E',
  value: BigNumber { _hex: '0x016345785d8a0000', _isBigNumber: true },
  data: '0x',
  accessList: [],
  hash:
   '0x1624e5dde04ed0fb1db7d18d9e4a50d16bd986581dc00f417e0cd1acbede2df2',
  v: 1,
  r:
   '0x3a75af820831a3f315efba04a117a14322840bca8f30fe6dfedfee6d2d9c655e',
  s:
   '0x5dc0c74a5ec7715da8e7f3f4d8c6d9165fca1d8517a86cc5c95d126dea95dd30',
  from: '0x0de710b8766d6eF045D6b3329188BF40DB95530b',
  confirmations: 0,
  wait: [Function] }
	
	
	{ type: 2,
  chainId: 3,
  nonce: 46,
  maxPriorityFeePerGas: BigNumber { _hex: '0x9502f900', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x9502f90e', _isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0x5208', _isBigNumber: true },
  to: '0x8111cEe45aD080F9De470bB311a8EC024AdCfa2E',
  value: BigNumber { _hex: '0x038d7ea4c68000', _isBigNumber: true },
  data: '0x',
  accessList: [],
  hash:
   '0x628997b46220262654acf7763a132ac5d209c5b07a443309b31d66f76fad5cea',
  v: 1,
  r:
   '0x7e6542bcc2f8fd0c6014843a74d9b129a5337023876a020656cd2ff350088a16',
  s:
   '0x4a82873d7516d8045996e3870c50a969760212f352bcf21d6cd4eab819cc373b',
  from: '0x0de710b8766d6eF045D6b3329188BF40DB95530b',
  confirmations: 0,
  wait: [Function] }
*/
		
})
	
})()

