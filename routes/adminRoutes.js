// adminRoutes.js

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.post('/signup', AdminController.signup);
router.post('/login', AdminController.login);

module.exports = router;
