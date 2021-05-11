const http = require("http");
const fs = require("fs");

// function rqListener(req, res) {}

// http.createServer(rqListener);  // method 1, using normal functinos

// http.createServer(function(req, res) {  // method 2, using anonymous functions

// });

const server = http.createServer((req, res) => {
	// console.log(req.url, req.method, req.headers);
	//process.exit(); // hard exit our program loop

	const url = req.url;
	if (url === "/") {
		res.setHeader("Content-Type", "text/html");
		res.write("<html>");
		res.write("<head><title>Enter Message</title></head>");
		res.write(
			'<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
		);
		res.write("</html>");
		return res.end();
	}

	const method = req.method;
	if (url === "/message" && method === "POST") {
		const body = [];
		req.on("data", (chunk) => {
			body.push(chunk);
		}); // This event listener will work till there is incoming data
		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			const message = parsedBody.split("=")[1];
			fs.writeFileSync("message.txt", message);
		}); // This event listener will work after the incoming data has ended
		res.statusCode = 302; // it means redirection
		res.setHeader("Location", "/");
		return res.end();
	}

	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><title>My First Page</title></head>");
	res.write("<body><h1>Hello World!</h1></body>");
	res.write("</html>");
	res.end();
});

server.listen(3000);
