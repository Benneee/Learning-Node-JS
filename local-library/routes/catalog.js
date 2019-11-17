// This file will connect with the controller to give URLs to the
// various functions we created earlier

// Import the express library
var express = require('express');

// Activate the router middleware
var router = express.Router();

// Import the controller modules
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');

// BOOK ROUTES

// GET catalog home page
router.get('/', book_controller.index);
