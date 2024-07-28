// orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');



// Route for fetching all orders
router.get('/', orderController.getAllOrders);

// Route for fetching a specific order by ID

// Route for updating order status
router.put('/update-order-status', orderController.updateOrderStatus);

router.post('/place-order', orderController.placeOrder);
router.get('/my-orders', orderController.getUserOrders);

// router.get('/:orderId', orderController.getOrderById);
module.exports = router;
