//  Import the author model first
// We need this so we can access and do stuff with our Author data
var Author = require('../models/author');
var async = require('async');
var Book = require('../models/book');

// Import middleware to handle validatio
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Authors
exports.author_list = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Author list');
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function(err, list_authors) {
      if (err) {
        return next(err);
      } else {
        res.render('author_list', {
          title: 'Author List',
          author_list: list_authors
        });
      }
    });
};

// Display detail page for a specific Author
exports.author_detail = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
  async.parallel(
    {
      author: function(callback) {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books: function(callback) {
        Book.find({ author: req.params.id }, 'title summary').exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.author == null) {
        var err = new Error('Author not found');
        err.status = 404;
        return next(err);
      }
      res.render('author_detail', {
        title: 'Author Detail',
        author: results.author,
        author_books: results.authors_books
      });
    }
  );
};

// Display Author create form on GET request
exports.author_create_get = function(req, res) {
  // res.send('NOT IMPLEMENTED: Author create GET');
  res.render('author_form', { title: 'Create Author' });
};

// Handle Author create on POST request

// exports.author_create_post = function(req, res) {
//   res.send('NOT IMPLEMENTED: Author create POST');
// };

exports.author_create_post = [
  // Validate fields
  body('first_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('First name must be specified')
    .isAlphanumeric()
    .withMessage('First name can only be alphabets'),

  body('family_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Family name must be specified')
    .isAlphanumeric()
    .withMessage('Family name can only be alphabets'),

  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601(),

  body('date_of_death', 'Invalid date of death')
    .optional({ checkFalsy: true })
    .isISO8601(),

  // Sanitize fields
  sanitizeBody('first_name').escape(),
  sanitizeBody('family_name').escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Render the form again with sanitized values / error messages
      res.render('author_form', {
        title: 'Create Author',
        author: req.body,
        errors: errors.array()
      });
      return;
    } else {
      // Data from form is valid

      // Create an Author object with escaped and trimmed data
      var author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
      });
      author.save(function(err) {
        if (err) {
          return next(err);
        } else {
          res.redirect(author.url);
        }
      });
    }
  }
];

// Display Author delete form on GET request
exports.author_delete_get = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Author delete GET');

  async.parallel(
    {
      author: function(callback) {
        Author.findById(req.params.id).exec(callback);
      },
      author_books: function(callback) {
        Book.find({ author: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.author == null) {
        res.redirect('/catalog/authors');
      }
      res.render('author_delete', {
        title: 'Delete Author',
        author: results.author,
        author_books: results.author_books
      });
    }
  );
};

// Handle Author delete on POST request
exports.author_delete_post = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Author delete POST');
  async.parallel(
    {
      author: function(callback) {
        Author.findById(req.body.authorid).exec(callback);
      },
      author_books: function(callback) {
        Book.find({ author: req.body.authorid }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.author_books.length > 0) {
        // Author has books
        // Render in same way as for GET route
        res.render('author_delete', {
          title: 'Delete Author',
          author: results.author,
          author_books: results.author_books
        });
        return;
      } else {
        // Author has no books
        // Delete object and redirect to the list of authors
        Author.findByIdAndRemove(req.body.authorid, function deletAuthor(err) {
          if (err) {
            return next(err);
          } else {
            res.redirect('/catalog/authors');
          }
        });
      }
    }
  );
};

// Display Author update on form on GET request
exports.author_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST request
exports.author_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
};
