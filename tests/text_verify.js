

(async function(){
	let fs = require('fs');
	let path = require('path');
	let axios = require('axios');
	let ziel = require('../ziel');
	let sReport = fs.readFileSync(path.join(__dirname, "_artifacts", "__report.json"), "utf8").toString(); 
	let oReport = JSON.parse(sReport);
	
	let sContractsFolder = "htlc";
	
	let timer = ms => new Promise(res => setTimeout(res, ms));
let oReportLastKey = Object.keys(oReport).pop();
	let oReportKey = Object.keys(oReport[oReportLastKey]);
	
	for(let aFileReport of oReportKey)
	{
	
		let sourceCode = fs.readFileSync(path.join(__dirname, "contracts", sContractsFolder, aFileReport), "utf8").toString();
		let contractname = aFileReport.replace(".sol", "");

		//oReport[aFileReport].map((oTx) => {
		for(let oTx of oReport[oReportLastKey][aFileReport]) {
			let data = {
				apikey: ziel.sZielEthScan,
				module: "contract",
				action: "verifysourcecode",
				contractaddress: oTx.address,
				sourceCode: sourceCode,
				contractname: contractname,
				codeformat: "solidity-single-file",
				compilerversion: "v0.4.23+commit.124ca40d",
				optimizationUsed: 0,
				runs: 200,
				constructorArguements: "",
				evmversion: "homestead",
			};
			
			let apiurl = "https://api-ropsten.etherscan.io/api";
/*
			$.ajax({
				type: "POST",
				url: apiurl,    //change to the correct api endpoint depending on the chain
				data: data,
				success: function (result) {
					console.log(result);
				},
				error: function (result) {
					console.log("error!");
					document.getElementById("postresult").innerHTML = "<font color='brown'>Unexpected Error</font>"
				}
			});
*/
			await axios.post(apiurl, data)
				.then(function (response) {
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});

			await timer(4000);
	
		}//);

	}

})()
/*
        var apiurl = "https://api-ropsten.etherscan.io/api";
        document.getElementById("apiurl").innerHTML = apiurl;

        $("#btnpost").click(function (e) {
            e.preventDefault();
            console.log("->Posting to API...")
            console.log("apiKey : " + $('#apikey').val())
            $.ajax({
                type: "POST",
                url: apiurl,    //change to the correct api endpoint depending on the chain
                data: {
                    apikey: $('#apikey').val(),
                    module: $('#module').val(),
                    action: $('#action').val(),
                    contractaddress: $('#contractaddress').val(),
                    sourceCode: $('#sourceCode').val(),
                    contractname: $('#contractname').val(),
                    codeformat: $('#codeformat').val(),
                    compilerversion: $('#compilerversion').val(),
                    optimizationUsed: $('#optimizationUsed').val(),
                    runs: $('#runs').val(),
                    constructorArguements: $('#constructorArguements').val(),
                    evmversion: $('#evmVersion').val(),
                    licenseType: $('#licenseType').val(),
                    libraryname1: $('#libraryname1').val(),
                    libraryaddress1: $('#libraryaddress1').val(),
                    libraryname2: $('#libraryname2').val(),
                    libraryaddress2: $('#libraryaddress2').val(),
                    libraryname3: $('#libraryname3').val(),
                    libraryaddress3: $('#libraryaddress3').val(),
                    libraryname4: $('#libraryname4').val(),
                    libraryaddress4: $('#libraryaddress4').val(),
                    libraryname5: $('#libraryname5').val(),
                    libraryaddress5: $('#libraryaddress5').val(),
                    libraryname6: $('#libraryname6').val(),
                    libraryaddress6: $('#libraryaddress6').val(),
                    libraryname7: $('#libraryname7').val(),
                    libraryaddress7: $('#libraryaddress7').val(),
                    libraryname8: $('#libraryname8').val(),
                    libraryaddress8: $('#libraryaddress8').val(),
                    libraryname9: $('#libraryname9').val(),
                    libraryaddress9: $('#libraryaddress9').val(),
                    libraryname10: $('#libraryname10').val(),
                    libraryaddress10: $('#libraryaddress10').val()
                },
                success: function (result) {
                    console.log(result);
                    if (result.status == "1") {
                        //1 = success
                        document.getElementById("postresult").innerHTML = "<font color='green'>Status: " + result.status + "<br>Message : " + result.message + "<br>Result : " + result.result + "</font>";
                    } else {
                        //0 = error
                        document.getElementById("postresult").innerHTML = "<font color='brown'>Status: " + result.status + "<br>Message : " + result.message + "<br>Result : " + result.result + "</font>";
                    }
                    console.log("status : " + result.status);
                    console.log("result : " + result.result);
                },
                error: function (result) {
                    console.log("error!");
                    document.getElementById("postresult").innerHTML = "<font color='brown'>Unexpected Error</font>"
                }
            });
*/