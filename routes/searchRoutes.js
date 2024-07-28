// searchRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/searchController');

// Route for searching products
router.get('/search', productController.search);

module.exports = router;
