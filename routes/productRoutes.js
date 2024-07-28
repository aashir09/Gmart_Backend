// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.post('/review', productController.createReview);// New route for submitting reviews

module.exports = router;
