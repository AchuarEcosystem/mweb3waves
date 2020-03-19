const express = require('express');
//const https = require("https");

//const { bloggersIds } = require("./data"); //data.js 
 
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
	res.sendFile('index.html', { root : __dirname});
});

/*
app.get("/api/purchase", (req, res) => {
//app.get("/api/votes", (req, res) => {
	const ids = bloggersIds.join(",");
  
	https
	  .get(
		"https://nodes-testnet.wavesnodes.com/addresses/data/3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4",
		apiRes => {
		  apiRes.setEncoding("utf8");
  
		  // wait for data
		  apiRes.on("data", function(chunk) {
			res.write(chunk);
		  });
  
		  apiRes.on("close", function() {
			res.end();
		  });
  
		  apiRes.on("end", function() {
			res.end();
		  });
		}
	  )
	  .on("error", function(e) {
		console.log(e.message);
		res.writeHead(500);
		res.end();
	  });
  });
*/


app.listen(process.env.PORT || 3000, () => {
	console.log(__dirname);
	console.log("Listening Port 3000");
});