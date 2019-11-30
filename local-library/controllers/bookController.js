// Import the Book model
var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

// Import validation middleware
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

// Index function to display the site welcome page
exports.index = function(req, res) {
  // res.send('NOT IMPLEMENTED: Site Home Page');

  async.parallel(
    {
      // Return the count of all the books we have in the DB
      book_count: function(callback) {
        // Pass an empty object as match condition to find all documents of this collection
        Book.countDocuments({}, callback);
      },
      book_instance_count: function(callback) {
        BookInstance.countDocuments({}, callback);
      },
      book_instance_available_count: function(callback) {
        BookInstance.countDocuments({ status: 'Available' }, callback);
      },
      author_count: function(callback) {
        Author.countDocuments({}, callback);
      },
      genre_count: function(callback) {
        Genre.countDocuments({}, callback);
      }
    },
    function(err, results) {
      res.render('index', {
        title: 'Local Library Home',
        error: err,
        data: results
      });
    }
  );
};

// Display the list of all Book
exports.book_list = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Book list');
  // Using the popular db find method...
  Book.find({}, 'title author ')
    .populate('author')
    .exec(function(err, list_books) {
      if (err) {
        return next(err);
      } else {
        res.render('book_list', { title: 'Book List', book_list: list_books });
      }
    });
};

// Display detail page for a specific Book
exports.book_detail = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
  async.parallel(
    {
      book: function(callback) {
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(callback);
      },
      book_instance: function(callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.book == null) {
        // No results in this case
        var err = new Error('Book not found');
        err.status = 404;
        return next(err);
      } else {
        // console.log({ book: results.book, instance: results.book_instance });
        res.render('book_detail', {
          title: results.book.title,
          book: results.book,
          book_instances: results.book_instance
        });
      }
    }
  );
};

// Display Book create form on GET request
exports.book_create_get = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Book create GET');

  // Get all the authors and genres, which we can use as details for the book
  async.parallel(
    {
      authors: function(callback) {
        Author.find(callback);
      },
      genres: function(callback) {
        Genre.find(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      } else {
        res.render('book_form', {
          title: 'Create Book',
          authors: results.authors,
          genres: results.genres
        });
      }
    }
  );
};

// Handle Book create on POST request

// exports.book_create_post = function(req, res) {
//   res.send('NOT IMPLEMENTED: Book create POST');
// };

exports.book_create_post = [
  // Convert the genre to an array
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') {
        req.body.genre = [];
      } else {
        req.body.genre = new Array(req.body.genre)
      }
    }
    next();
  },
  // Validate fields
  body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  body('isbn', 'ISBN must not empty').isLength({ min: 1 }).trim(),

  // Sanitize fields (using wildcard)
  sanitizeBody('*').escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data
    var book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
    })

    if (!errors.isEmpty()) {
      // There are errors. 
      // Render the form again with sanitized values/error messages

      // Get all authors and genres for form
      async.parallel({
        authors: function(callback) {
          Author.find(callback)
        },
        genres: function(callback) {
          Genre.find(callback);
        },
      }, function(err, results) {
        if (err) {
          return next(err)
        }

        // Mark our selected genres as checked
        for (let i = 0; i < results.genre.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            results.genres[i].checked = 'true';
          }
        }
        res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres, book: book, errors: errors.array() })
      });
      return;
    } else {
      // Data from form is valid.
      // Save book
      book.save(function(err) {
        if (err) {
          return next(err)
        } else {
          // Successful, redirect to new book record
          res.redirect(book.url)
        }
      })
    }
  }
]

// Display Book delete form on GET request
exports.book_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle Book delete on POST request
exports.book_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display Book update form on GET request
exports.book_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle Book update on POST request
exports.book_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Book update POST');
};
