// Import the Genre model
var Genre = require('../models/genre');

// Display the list of all Genre
exports.genre_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre list');
};

// Display detail page for a specific genre
exports.genre_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// Display Genre create form on GET request
exports.genre_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST request
exports.genre_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET request
exports.genre_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST request
exports.genre_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET request
exports.genre_list_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST request
exports.genre_list_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST');
};
