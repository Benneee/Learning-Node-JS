// Learning Node JS with MDN

// Load HTTP Module
const http = require('http');

// Declare hostname and port numbers
const hostname = '127.0.0.1';
const port = 8000;

// Create HTTP Server
const server = http.createServer((req, res) => {
  // Set response with HTTP Status and Content Type
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Send the response body as the text below
  res.end('Hello World\n');
});

// Prints a log once the server starts listening
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
