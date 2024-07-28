
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Controller function for creating a new product// Controller function for creating a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      salesPrice,
      rating,
      thumbnail,
      images,
      description,
      shortDescription,
    } = req.body;

    // Extract token from the request headers
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Split the token to remove 'Bearer ' and get the token value
    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format, authorization denied' });
    }

    const decoded = jwt.verify(tokenParts[1], 'adminJwtSecret');
    const createdBy = decoded.admin.id; // Get admin ID from the decoded token

    const product = new Product({
      name,
      price,
      category,
      salesPrice,
      rating,
      thumbnail,
      images,
      description,
      shortDescription,
      createdBy // Assign the admin ID as the creator of the product
    });

    const newProduct = await product.save();
    res.status(201).json({ message: 'Product successfully created'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Controller function for updating a product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    // Extract token from the request headers
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Split the token to remove 'Bearer ' and get the token value
    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format, authorization denied' });
    }

    const decoded = jwt.verify(tokenParts[1], 'adminJwtSecret');
    const updatedBy = decoded.admin.id; // Get admin ID from the decoded token

    // Add updatedBy field to the updated product data
    updatedProductData.updatedBy = updatedBy;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
  
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  // Controller function for getting a product by ID
  exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // productController.js


  exports.createReview = async (req, res) => {
    try {
      const { productId, rating } = req.body;
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Assuming reviews are stored as an array of objects
      product.reviews.push({ rating });
  
      await product.save();
  
      res.status(201).json({ message: 'Review added successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };