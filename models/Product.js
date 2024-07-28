// Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness of product name
  },

  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  salesPrice: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: false,
    validate: [arrayLimit, 'Exceeded the limit of 4 images']
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      }
    }
  ]
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 4;
}

module.exports = mongoose.model('Product', productSchema);
