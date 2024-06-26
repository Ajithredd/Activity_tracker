const express = require('express');
const router = express.Router();
const TimeLimit = require('../Models/TimeLimit');
//const authMiddleware = require('../middleware/auth'); // Assuming you have an auth middleware for authentication

// Set a time limit for a specific hostname
router.post('/',  async (req, res) => {
    try {
      const { hostname, timeLimit } = req.body;
      const userId = req.user.id; // Assuming user ID is set in auth middleware
  
      if (!hostname || !timeLimit) {
        return res.status(400).json({ message: 'Hostname and time limit are required.' });
      }
  
      // Check if a time limit already exists for the hostname and user
      let existingTimeLimit = await TimeLimit.findOne({ userId, hostname });
  
      if (existingTimeLimit) {
        existingTimeLimit.timeLimit = timeLimit;
        await existingTimeLimit.save();
      } else {
        const newTimeLimit = new TimeLimit({
          userId,
          hostname,
          timeLimit,
        });
        await newTimeLimit.save();
      }
  
      res.status(200).json({ message: 'Time limit set successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  
module.exports = router;
