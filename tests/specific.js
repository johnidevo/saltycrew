const solc = require('solc');
const path = require('path');
const fs = require('fs');

const solc_version = "v0.4.23+commit.124ca40d";
const sContractName = "CorsToken.sol";


const sContract = path.resolve(__dirname, "./contracts", sContractName);
const sSource = fs.readFileSync(sContract, "utf8");

function doSomething() {
  return new Promise((resolve, reject) => {
		solc.loadRemoteVersion(solc_version, async function(err, solc_specific){

			if(err) reject(err);
			console.log("Compiling", [sContract].join(", "));
			var oOutput = await solc_specific.compile(sSource, 1);
			resolve(oOutput);
		});
		
  })
}

const promise = doSomething(); 
promise.then(successCallback, failureCallback);

function successCallback(oOutput) {
	console.log(oOutput, "oOutput");
}

function failureCallback(err) {
	console.log(err, "err");
}


/*
async function exter(err, solc_specific) {

	if(err) return console.log(err);
	console.log("Compiling", [sContract].join(", "));
	var oOutput = await solc_specific.compile(sSource, 1);
	var sContent = JSON.stringify(oOutput);
	fs.writeFile(sContract +'.json', sContent, err => {
		if (err) return console.error(err)
	});
	return true;
}

solc.loadRemoteVersion(solc_version, exter);


const parser = require('@solidity-parser/parser');

try {
	const ast = parser.parse(sSource)
	console.log(ast)
} catch (e) {
	if (e instanceof parser.ParserError) {
		console.error(e.errors)
	}
}
*/
/*

var input = JSON.stringify({
  language: 'Solidity',
  sources: {
    'CorsToken.sol': {
      content: sSource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['evm', 'bytecode'],
      },
    },
  },
});

console.log('1111');

(async function(){
	
	try {
		//const solc = require("solc");
		//const sContract = path.resolve(__dirname, "./contracts", sContractName);
		//const sSource = fs.readFileSync(sContract, "utf8");
		console.log("Compiling", [sContract].join(", "));
		const oOutput = await solc.compile(sSource, 1);
		console.log("Compiled");
		var sContent = JSON.stringify(oOutput);
		console.log(oOutput);
	}
	catch (err) {
		console.log(err)
	}
	
})()
*/

