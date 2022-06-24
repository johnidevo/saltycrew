var solc = require('solc')
var fs = require('fs')
var path = require('path')

var solc_version = "v0.4.16+commit.d7661dd9"
var contracts_directory = path.join(__dirname, "/contracts/erc20basic/");
var contract_name = "ERC20Basic"
var contract_filename = "ERC20Basic.sol"
var is_optimized = 1

var input = {}

var files = fs.readdirSync(contracts_directory);
console.log(files);
for (file in files) {
    let item = files[file];
    if (item.slice(-4) == ".sol") {
        let file_path = contracts_directory + '/' + item;
        input[item] = fs.readFileSync(file_path, 'utf8');
    }
}

solc.loadRemoteVersion(solc_version, function (err, solc_specific) {
    if (!err) {
        var output = JSON.parse(solc_specific.lowlevel.compileMulti(JSON.stringify({ sources: input }), is_optimized));
        var bytecode = output['contracts'][contract_filename + ':' + contract_name]['runtimeBytecode'];
        console.log(bytecode);
    }
		else {
			console.log(err);
		}
});


/*
references
(Shawn, 2021)
https://www.shawntabrizi.com/ethereum/verify-ethereum-contracts-using-web3-js-and-solc/
*/
