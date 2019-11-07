// Require the express library
const express = require('express');
const app = express();

// Use the http method provided by express
// to send a response data for the server
app.get('/', (request, response) => {
  response.send('Hello World!');
});

// Listen for requests on port 8000 and create a callback
// to log the text in the console once the
// app is running....
app.listen(8000, () => {
  console.log('App running on port 8000');
});
