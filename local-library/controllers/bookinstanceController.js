// Import the BookInstance model for access to the BookInstance data
var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');

// Validation middleware
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

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
exports.bookinstance_detail = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function(err, bookinstance) {
      if (err) {
        return next(err);
      }
      if (bookinstance == null) {
        // No results in this case
        var err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
      } else {
        res.render('bookinstance_detail', {
          title: 'Copy: ' + bookinstance.book.title,
          bookinstance: bookinstance
        });
      }
    });
};

// Display BookInstance create form on GET request
exports.bookinstance_create_get = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: BookInstance create GET');

  Book.find({}, 'title').exec(function(err, books) {
    if (err) {
      return next(err);
    } else {
      res.render('bookinstance_form', {
        title: 'Create BookInstance',
        book_list: books
      });
    }
  });
};

// Handle BookInstance create on POST request
// exports.bookinstance_create_post = function(req, res) {
//   res.send('NOT IMPLEMENTED: BookInstance create POST');
// };

exports.bookinstance_create_post = [
  // Validate fields
  body('book', 'Book must be specified')
    .isLength({ min: 1 })
    .trim(),
  body('imprint', 'Imprint must be specified')
    .isLength({ min: 1 })
    .trim(),
  body('due_back', 'Invalid date')
    .optional({ checkFalsy: true })
    .isISO8601(),

  // Sanitise fields
  sanitizeBody('book').escape(),
  sanitizeBody('imprint').escape(),
  sanitizeBody('status')
    .trim()
    .escape(),
  sanitizeBody('due_back').toDate(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data
    var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render the form again with sanitised values and error messages
      Book.find({}, 'title').exec(function(err, books) {
        if (err) {
          return next(err);
        } else {
          res.render('booinstance_form', {
            title: 'Create BookInstance',
            book_list: books,
            selected_book: bookinstance.book._id,
            errors: errors.array(),
            bookinstance: bookinstance
          });
        }
      });
      return;
    } else {
      // Data from form is valid
      bookinstance.save(function(err) {
        if (err) {
          return next(err);
        } else {
          res.redirect(bookinstance.url);
        }
      });
    }
  }
];

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
