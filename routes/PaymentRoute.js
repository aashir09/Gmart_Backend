// routes/PaymentRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/PaymentController'); // Corrected import path

router.post('/create-order', orderController.createOrder);
router.post('/verify-payment', orderController.verifyPayment);

module.exports = router;
