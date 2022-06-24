(async function(){ //
//const dotenv = require('dotenv').config();
var request = require('request');
const ziel = require('../ziel'); // ziel.js -> module.exports={ sZielInfura: "" }

//return console.log(ziel.sZielInfura);

var headers = {
	'Content-Type': 'application/json'
};

//var dataString = '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",true], "id":1}';
//var dataString = '{"jsonrpc": "2.0","method": "eth_sendrawtransaction","params":["data"],"id": 1}';
//var dataString = '{"jsonrpc": "2.0","method": "echo", "params": ["Hello JSON-RPC"], "id": 1}';
//_______________
	
	
var params = [
	"0xe9884777D9F377530788CeE12A40269f812cF30a",
	/*{
  	//"data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
	},*/
	//"0x0",
	"latest",
	//true
];

var dataString = '{"jsonrpc":"2.0","method":"eth_getAccountInfo","params":'+ JSON.stringify(params) +',"id":1}';

console.log(dataString);
	
//--------------------
var options = {
	url: `https://rinkeby.infura.io/v3/${ziel.sZielInfura}`,
	method: 'POST',
	headers: headers,
	body: dataString,
};

function callback(error, response, body) {
	if (!error && response.statusCode == 200) {
		json = response.body;
		var obj = JSON.parse(json);
		console.log(obj);

		hex = obj.result;
		final = parseInt(hex, 16)
		console.log(final) 

	}
}

request(options, callback);
	
})();
