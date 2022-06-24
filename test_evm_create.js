(async function(){ //
//const dotenv = require('dotenv').config();
var request = require('request');
const ziel = require('../ziel'); // ziel.js -> module.exports={ sZielInfura: "" }

//return console.log(ziel.sZielInfura);

	var headers = {
	'Content-Type': 'application/json'
};

var dataString = '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",true], "id":1}';

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
		console.log(obj)
	}
}

request(options, callback);
	
})();