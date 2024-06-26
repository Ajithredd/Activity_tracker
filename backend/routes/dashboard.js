const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to verify JWT token
const User = require('../Models/User'); // Example model, adjust as per your schema

// GET /api/dashboard/user
// Fetch logged-in user data
router.get('/user', auth, async (req, res) => {
  try {
    // Fetch user data from database using req.user.id (provided by auth middleware)
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add more endpoints as needed (e.g., fetch dashboard data)

module.exports = router;
