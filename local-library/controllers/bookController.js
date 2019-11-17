// Import the Book model
var Book = require('../models/book');

// Index function to display the site welcome page
exports.index = function(req, res) {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display the list of all Book
exports.book_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Book list');
};

// Display detail page for a specific Book
exports.book_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display Book create form on GET request
exports.book_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle Book create on POST request
exports.book_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Book create POST');
};

// Display Book delete form on GET request
exports.book_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle Book delete on POST request
exports.book_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display Book update form on GET request
exports.book_list_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle Book update on POST request
exports.book_list_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Book update POST');
};
