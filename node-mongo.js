// Import and initialise express
var express = require("express");
var app = express();
var router = express.Router();

// Import mongoose library
var mongoose = require("mongoose");

// Connect to the DB
var url =
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox-agjgy.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => console.log(error));

var port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
