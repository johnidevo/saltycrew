const path = require('path');
const fs = require('fs');
const solc = require('solc'); //0.5.11, 0.5.12, 0.7.4, 0.7.6, 0.8.9


sContractsFolder = "./contracts/CrowdSale/";
const sources = {};
for (const src of fs.readdirSync(path.join(__dirname, sContractsFolder))) {
	if (!src.endsWith(".sol")) continue;
	let source = fs.readFileSync(path.join(__dirname, sContractsFolder, src), "utf8").toString();
	sources[src] = { content : source }; 
}

const input = {
    language: 'Solidity',
    sources: sources,
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};


function findImports(path) {
	try {
		const file = fs.readFileSync(path.join(__dirname, sContractsFolder, path), "utf8").toString();
		input.sources[path] = { content: file };
		return { content: file };
	} catch (error) {
		return { error };
	}
}


console.log(sources);
let output = solc.compile(JSON.stringify(input));
console.log(output);



