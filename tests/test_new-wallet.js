(async function(){

	var ethers = require('ethers');
	var ziel = require('../ziel');

let sNetwork = 'ropsten'; //homestead
let provider = new ethers.providers.InfuraProvider(sNetwork, ziel.sZielInfura);
//let wallet = new ethers.Wallet(ziel.sZielPrivate1, provider);

// create a new random account
let wallet = ethers.Wallet.createRandom();

/*

address: 0x8111cEe45aD080F9De470bB311a8EC024AdCfa2E
mnemonic: blind wrap tomorrow brave sunny success note swap arrange prevent romance kidney
privateKey: 0xa9cb3b74dc90c8622e5abc21c965 20f6f8bf0a1da90bb97e1f3f392a095c186c
#4

926cfc517a7c4886d5eb125d05afc17583183014b11816f96c5d64f68b273e5a
#5

33ae9c6f8342a9516f0fdc5b34fb0bc7fb25108289eec38e08e902b8c388ed4e
#6

*/

console.log('address:', wallet.address)
console.log('mnemonic:', wallet.mnemonic.phrase)
console.log('privateKey:', wallet.privateKey)

})()