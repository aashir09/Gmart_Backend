// searchController.js

const Product = require('../models/Product');
exports.search = async (req, res) => {
  try {
    // Extract search parameters from request query
    const { name, minPrice, maxPrice } = req.query;

    // Construct query object based on provided search parameters
    const query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
    }
    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }

    // Find products matching the query
    const products = await Product.find(query);

    // Return the search results
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
