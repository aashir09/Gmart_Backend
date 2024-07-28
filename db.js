// db.js

const mongoose = require('mongoose');

// MongoDB connection URL
const MONGODB_URI = 'mongodb+srv://aashirmansuri:<password>@gmart.j3bcdxy.mongodb.net/?retryWrites=true&w=majority&appName=Gmart';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for database connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
