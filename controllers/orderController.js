// orderController.js
const Order = require('../models/OrderModel');
const jwt = require('jsonwebtoken');

// orderController.js
exports.placeOrder = async (req, res) => {
  try {
    const userToken = req.header('Authorization');

    if (!userToken) {
      return res.status(401).json({ message: 'No user token, authorization denied' });
    }

    const tokenParts = userToken.split(' ');
    
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format, authorization denied' });
    }

    const decoded = jwt.verify(tokenParts[1], 'jwtSecret');
    const userId = decoded.user.id; // Assuming the user ID is stored in the JWT payload

    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
    const orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    const { products, totalPrice, userDetails } = req.body;

    console.log('Received user details:', userDetails); // Log userDetails

    // Add thumbnail and category to each product
    const productsWithDetails = products.map(product => ({
      ...product,
      thumbnail: product.thumbnail, // Assuming thumbnail is provided in the request
      category: product.category // Assuming category is provided in the request
    }));

    // Create a new order
    const order = new Order({
      orderNumber,
      userId,
      products: productsWithDetails,
      totalPrice,
      userDetails // Include user details in the order
    });

    console.log('Order object before saving:', order); // Log order object before saving

    const newOrder = await order.save();

    // Return the newly created order
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// Controller function for fetching a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Controller function for updating order status by order number
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderNumber, orderStatus } = req.body;

    // Find the order by order number and update its status
    const order = await Order.findOneAndUpdate({ orderNumber }, { orderStatus }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Controller function for fetching orders of a specific user
exports.getUserOrders = async (req, res) => {
  try {
 
    const userToken = req.header('Authorization');

    if (!userToken) {
      return res.status(401).json({ message: 'No user token, authorization denied' });
    }

    const tokenParts = userToken.split(' ');
    
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format, authorization denied' });
    }

    const decoded = jwt.verify(tokenParts[1], 'jwtSecret');
    const userId = decoded.user.id;

    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {

    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  placeOrder: exports.placeOrder,
  getAllOrders: exports.getAllOrders,
  getOrderById: exports.getOrderById,
  updateOrderStatus: exports.updateOrderStatus,
  getUserOrders:exports.getUserOrders,
  
};
