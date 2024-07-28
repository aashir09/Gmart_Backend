// AdminController.js

const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.signup = async (req, res) => {
  try {
    const { Firstname, Lastname, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if admin with the same username already exists
    admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists with this email" });
    }

    // Create a new admin instance with the provided data
    admin = new Admin({
      Firstname,
      Lastname,
      email,
      password,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    // Save the admin to the database
    await admin.save();

    // Send a success response
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and sign JWT
    const payload = {
      admin: {
        id: admin.id
      }
    };
    jwt.sign(payload, 'adminJwtSecret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
