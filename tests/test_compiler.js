const path = require('path')
const fs = require('fs')
const ethers = require('ethers');
const ziel = require('../ziel')
const solc = require("solc");
const network = "homestead"; //'ropsten'; //homestead

console.log(new Date().toLocaleString());


sContractsFolder = "./contracts/htlc/";


init(sContractsFolder);


/*
(async function(){
	
				let contract, oReport = {};
				let oAddresses = {};
				let aArtifacts = [];
	
	let report = fs.readFileSync(path.resolve(__dirname, "./_artifacts", "__report.json")).toString();
				
	
	let aaMetadata = [[1,2,'test01.sol','test02'], [1,2,'test11.sol','test12']]; 
	
				for (const aMeta of aaMetadata) {
					let oMeta = {
						"contract": aMeta[3],
						"date": new Date().toLocaleString(),
						"address": '0x00',
						"tx": '0x00'
					}

					if (typeof aArtifacts[aMeta[2]] == 'undefined') aArtifacts[aMeta[2]] = [];
					aArtifacts[aMeta[2]].push(oMeta);
					oAddresses[aMeta[2]] = aArtifacts[aMeta[2]];

					
					//report = Object.assign(oReport);
					
				}//);
				
				
				
				oReport[Date.now()] = oAddresses;
report = JSON.parse(report);
//if (report.length !== 0)
let newed = Object.assign(report, oReport);
	return console.log(newed);
return console.log('asas', JSON.parse(report));
		
})();
*/
/*
6.811498169932954286 Ether
*/

function compile(sContractsFolder) {
	try {
		
		//https://github.com/ethereum/solc-bin/blob/gh-pages/bin/list.txt
		const solc_version = "v0.4.23+commit.124ca40d"; //"v0.8.9+commit.e5eed63a" 

		const sources = {};
		for (const src of fs.readdirSync(path.join(__dirname, sContractsFolder))) {
			if (!src.endsWith(".sol")) continue;
			let source = fs.readFileSync(path.join(__dirname, sContractsFolder, src), "utf8").toString(); // .toString(); !!!
			sources[src] = source; //{ content : source }; 
		}

		let oJson = {
			language: 'Solidity',
			sources: sources, //{ content : sources }, //sources,
			settings: {
				outputSelection: {
					'*': {
						'*': ['*'],
					},
				},
			},
		};

/*
		function findImports(path) {
			try {
				const file = fs.readFileSync(path.join(__dirname, sContractsFolder, path), "utf8");
				input.sources[path] = { content: file };
				return { contents: file };
			} catch (error) {
				return { error };
			}
		}
*/
		
		return new Promise((resolve, reject) => {
			console.log("In promise");
			solc.loadRemoteVersion(solc_version, async function(err, solc_specific) {
				console.log("Compiling", fs.readdirSync(path.join(__dirname, sContractsFolder)).join(", "));

				var oOutput = await solc_specific.compile(oJson, 1); //, { import: findImports }); // , 1, { import: findImports }); //
				console.log("Compiled!");
				resolve(oOutput);

				fs.writeFile(path.resolve(__dirname, "./_artifacts", "__source.json"), //path.resolve(buildPath, sContractName + ".json"),  
					"\n\n_____\n"+ new Date().toLocaleString() +"\n\n"+ JSON.stringify(oJson, null, 2), 
					err => {
						if (err) return console.error(err)
					});		

				fs.writeFile(path.resolve(__dirname, "./_artifacts", "__compiler.json"), //path.resolve(buildPath, sContractName + ".json"),  
					"\n\n_____\n"+ new Date().toLocaleString() +"\n\n"+ JSON.stringify(oOutput, null, 2), 
					err => {
						if (err) return console.error(err)
					});		

				if (err) reject(err);
			});

		}).catch(err => console.error(err))
/*
		fs.writeFile(path.resolve(__dirname, "./contracts", sContractName.replace(".sol", ".json")), sContent, err => {
			if (err) return console.error(err)
		})
*/	
	}
	catch (err) {
		console.log(err)
	}
}

function init(sContractsFolder) {
  try {
  
		console.log('Call function');
		const promise = compile(sContractsFolder); 
		//promise.then(successCallback, failureCallback);
		
		
		promise.then((oMetadata) => {

			//console.log(req.session.contract.name);
			console.log(oMetadata, 'oMetadata');
			//if (req.session.contract.name !== sContractDeploy) throw new Error({ errorx: 'Compilet contract not found' })
			console.log('Get bytecode, interface...');
			var aaMetadata = [];
			var aFileName = [];
			for (let sKey in oMetadata.contracts) {
				aFileName = sKey.split(":");  
				aaMetadata.push([
					oMetadata.contracts[sKey].interface,
					oMetadata.contracts[sKey].bytecode,
					aFileName[0], // +">>>"+ sKey
					aFileName[1]
				]);
				
				sFileName = aFileName[0].replace(".sol", ".json");
				console.log("Writing: _"+ sFileName +" -> "+ aFileName[1]);  
				fs.appendFile(path.resolve(__dirname, "./_artifacts", "_"+ sFileName), //path.resolve(buildPath, sContractName + ".json"),  
					"------"+ JSON.stringify(oMetadata.contracts[sKey], null, 2), 
					err => {
						if (err) return console.error(err)
					});			
			}
			
/*
			//var compiled = JSON.parse(req.session.contract.compiled);
			var sConKey = Object.keys(oMetadata.contracts)[0];
			var interface = oMetadata.contracts[sConKey].interface
			var bytecode = oMetadata.contracts[sConKey].bytecode
*/

			//var abi = Object.values(oCompiledContract);
			//var bytecode = abi[0].bytecode;
			//var interface = abi[0].interface;
			return aaMetadata;
		}, (err) => {
			console.log(err, "failure callback");
		})
		.then(async (aaMetadata) => {
			try {
				console.log("Network: "+ network);
				let rProviderRPC = new ethers.providers.InfuraProvider(network, ziel.sZielInfura);
/*
async function get_gas_price(){
	let gasPrice = await rProviderRPC.getGasPrice();
	gasPrice = ethers.utils.formatUnits(gasPrice, "gwei");
	return gasPrice;
	//console.log('getGasPrice in Gwei: ', getGasPrice);
}

let getGasPrice = await get_gas_price();

console.log(getGasPrice);
increasedGas = parseFloat(getGasPrice) + 0.1;
console.log('getGasPrice: '+ increasedGas);
//let increasedGas = ethers.utils.hexlify(getGasPrice);
console.log(increasedGas);
//console.log(ethers.utils.formatUnits(increasedGas, "gwei"));
*/
/*
1.500000007
0x01
0.000000001
*/
	

		/*		

report = JSON.parse(report);
	*/
				

				let report = fs.readFileSync(path.resolve(__dirname, "./_artifacts", "__report.json"));
				report = JSON.parse(report);
				//ethers.getDefaultProvider('ropsten');
				console.log('Private-key, Wallet & Factory');
				// Load the wallet to deploy the contract with
				let sZielPrivate = ziel.sZielPrivateM2; //ziel.sZielPrivate1; //
				let wallet = new ethers.Wallet(sZielPrivate, rProviderRPC);
				let contract, oReport = {};
				let oAddresses = {};
				let aArtifacts = [];
				let sTokenAddress = '';
				let erc20 = "";
				//console.log(aaMetadata);
				for (const aMeta of aaMetadata) {
				//aaMetadata.map(async aMeta => {
					console.log('!!! Deploy: '+ aMeta[2] +" : "+ aMeta[3]);
					if (aMeta[3] !== "hpt") continue;

					let factory = new ethers.ContractFactory(aMeta[0], aMeta[1], wallet);
					console.log("hpt contract");
					contract = await factory.deploy({gasLimit: 2500000, gasPrice: 5000000 });
				//contract = await factory.deploy({gasLimit: 400000, gasPrice: 2000000000 }); #2 @ Balance: 0.00087316008759 Ether
					////  																		 182257						 251586883
					// contract = await factory.deploy({gasLimit: 250000, gasPrice: 2500000000 }); // 1.77 $ works! Error Dropped!
					// contract = await factory.deploy({gasLimit: 200000, gasPrice: 2800000000 }); // 1.77 $ works! Error Dropped!
					


					/*
					else if (aMeta[3] == "ERC20")
					{
						console.log("erc20");
						contract = await factory.deploy(1000000); //{gasPrice: 5000000 });
						erc20 = contract.address;
						
					}
					else 
					{
						console.log("SafeMath...");
						contract = await factory.deploy(); //{gasPrice: 5000000 });
						
					}
					*/
					
					
					console.log("address: "+ aMeta[3] +": ");
					console.log(contract.address);

					//var deployed = await contract.deployed();
					//console.log("deployed");

					
/*
					if (aMeta[2] == "PacktTokenSale.sol") 
					{
						parameter = sTokenAddress;
						console.log(sTokenAddress);
						console.log("PacktTokenSale.sol parameter: "+ parameter);

						contract = await factory.deploy(parameter, 1000000000000000); //{gasPrice: 5000000 });
						console.log("Address: ");
						console.log(contract.address);

						//var deployed = await contract.deployed()
					} 
					else if (aMeta[2] == "PacktToken.sol")
					{

						contract = await factory.deploy(1000000); //{gasPrice: 5000000 });
						console.log("Address: ");
						console.log(contract.address);

						sTokenAddress = contract.address;
						console.log("PacktToken.sol address: "+ sTokenAddress);
						var deployed = await contract.deployed()
					}
					else {
						
						contract = await factory.deploy(); //{gasPrice: 5000000 });
						console.log("Address: ");
						console.log(contract.address);

						//var deployed = await contract.deployed()
					}
*/
/*
					// The transaction that was sent to the network to deploy the Contract
					// See: https://ropsten.etherscan.io/tx/0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51
					console.log("Transaction.hash");
					console.log(contract.deployTransaction.hash);
					// "0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51"
					console.log("Deployed");
*/
					// The contract is NOT deployed yet; we must wait until it is mined

					//console.log(deployed);

					
					
					
					/*
report["abc"] = {
	aMeta[2]: aArtifacts,
		"Lavevel-Token.sol": [
			{
				"date": "12/29/2021, 9:49:53 AM",
				"address": "0xe2D6fb512C4b7b476E074808F0E64699dAC55741",
				"tx": "0xa49d7ebb3fbe3ea8a0f0a9868ecfdeb75c4542f92e3f9fb45f5d5154a01825fc"
			}
		]
};
W
Get bytecode, interface...                                                                                                                                                              
Writing: _Lavevel-ICO.json -> LavevelICO                                                                                                                                                
Writing: _Lavevel-ICO.json -> Ownable                                                                                                                                                   
Writing: _Lavevel-ICO.json -> SafeMath                                                                                                                                                  
Writing: _Lavevel-ICO.json -> Token                                                                                                                                                     
Writing: _Lavevel-Token.json -> BasicToken                                                                                                                                              
Writing: _Lavevel-Token.json -> ERC20                                                                                                                                                   
Writing: _Lavevel-Token.json -> ERC20Basic                                                                                                                                              
Writing: _Lavevel-Token.json -> LavevelToken                                                                                                                                            
Writing: _Lavevel-Token.json -> SafeMath                                                                                                                                                
Writing: _Lavevel-Token.json -> Token                                                                                                                                                   
Network: ropsten      
					
					aAddresses.push([new Date().toLocaleString(), , contract.address, contract.deployTransaction.hash]);
*/
					let oMeta = {
						"contract": aMeta[3],
						"date": new Date().toLocaleString(),
						"address": contract.address,
						"tx": contract.deployTransaction.hash
					}

					if (typeof aArtifacts[aMeta[2]] == 'undefined') aArtifacts[aMeta[2]] = [];
					aArtifacts[aMeta[2]].push(oMeta);
					oAddresses[aMeta[2]] = aArtifacts[aMeta[2]];

					
					//report = Object.assign(oReport);
					
				}//);
				
				
				
				oReport[Date.now()] = oAddresses;
				
report = Object.assign(report, oReport);

				
/*
let report = fs.readFileSync(path.resolve(__dirname, "./_artifacts", "__report.json"));
report = JSON.parse(report);
report[sArtifacts] = 
*/
				fs.writeFile(path.resolve(__dirname, "./_artifacts", "__report.json"), //path.resolve(buildPath, sContractName + ".json"),  
					JSON.stringify(report, null, 2), 
					err => {
						if (err) return console.error(err)
					});						
				
				
				return report;
				
			}
			catch (err){
				console.log(err)
			}
		})
		.then((aAddresses) => {
				console.log('end', aAddresses);
			return aAddresses;
		})
		.catch(function(err) {
			
			console.log('error: ', err);
			reject(err);
		});

	} catch(err) {
			console.log(err);
	}	
	
}




