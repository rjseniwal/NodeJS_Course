const http = require("http");

// function rqListener(req, res) {}

// http.createServer(rqListener);  // method 1, using normal functinos

// http.createServer(function(req, res) {  // method 2, using anonymous functions

// });

const server = http.createServer((req, res) => {
	console.log(req);
});

server.listen(3000);
