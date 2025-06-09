const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');  
const User = require('../models/User'); // Import User model if needed for user info 
// Middleware to check if the user is authenticated
const auth = async (req, res, next) => {
    try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'Invalid user' });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
};  

// Export the middleware
module.exports = auth;        
// This middleware checks for a JWT in the request headers and verifies it.
// If the token is valid, it attaches the user information to the request object and calls the next middleware.                                 
// If the token is missing or invalid, it responds with an error message.           
