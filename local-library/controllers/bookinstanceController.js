// Import the BookInstance model for access to the BookInstance data
var BookInstance = require('../models/bookinstance');

// Display list of all BookInstances
exports.bookinstance_list = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: BookInstance list');
  BookInstance.find()
    .populate('book')
    .exec(function(err, list_bookinstances) {
      if (err) {
        return next(err);
      } else {
        res.render('bookinstance_list', {
          title: 'Book Instance List',
          bookinstance_list: list_bookinstances
        });
      }
    });
};

// Display detail page for a specific BookInstance
exports.bookinstance_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
};

// Display BookInstance create form on GET request
exports.bookinstance_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// Handle BookInstance create on POST request
exports.bookinstance_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create POST');
};

// Display BookInstance delete form on GET request
exports.bookinstance_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST request
exports.bookinstance_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET request
exports.bookinstance_list_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle BookInstance update on POST request
exports.bookinstance_list_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
};
