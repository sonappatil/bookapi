const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { signup, login } = authController;
// Route for user signup    
router.post('/signup', signup);
// Route for user login
router.post('/login', login);
// Export the router
module.exports = router;
