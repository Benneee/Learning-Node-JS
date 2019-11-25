// Import the Genre model
var Genre = require('../models/genre');
var Book = require('../models/book'); // To access Book details for a genre
var async = require('async');

// Display the list of all Genre
exports.genre_list = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Genre list');
  Genre.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_genres) {
      if (err) {
        return next(err);
      } else {
        res.render('genre_list', {
          title: 'Genre List',
          genre_list: list_genres
        });
      }
    });
};

// Display detail page for a specific genre
exports.genre_detail = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
  async.parallel(
    {
      genre: function(callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: function(callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // No results in this case
        var err = new Error('Genre not found');
        err.status = 404;
        return next(err);
      } else {
        res.render('genre_detail', {
          title: 'Genre Detail',
          genre: results.genre,
          genre_books: results.genre_books
        });
      }
    }
  );
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
