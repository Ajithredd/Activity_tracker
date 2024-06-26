// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  
  module.exports = verifyToken;
  