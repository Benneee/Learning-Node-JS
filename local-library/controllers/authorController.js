//  Import the author model first
// We need this so we can access and do stuff with our Author data
var Author = require('../models/author');

// Display list of all Authors
exports.author_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Author list');
};

// Display detail page for a specific Author
exports.author_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET request
exports.author_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST request
exports.author_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET request
exports.author_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST request
exports.author_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update on form on GET request
exports.author_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST request
exports.author_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
};
