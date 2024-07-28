  const mongoose = require('mongoose');

  const adminSchema = new mongoose.Schema({
    Firstname: {
      type: String,
      required: true
    },
    Lastname: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });

  module.exports = mongoose.model('Admin', adminSchema);
