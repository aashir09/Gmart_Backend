const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    thumbnail: {
      type: String, // Assuming thumbnail is a URL
      required: true
    },
    category: {
      type: String,
      required: true
    }
  }],
  orderStatus: {
    type: String,
    enum: ['Preparing', 'Out for Delivery', 'Delivered'],
    default: 'Preparing'
  },
  deliveryFee: {
    type: Number,
    default: 100
  },
  totalPrice: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  userDetails: { // Include userDetails field
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);
