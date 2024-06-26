// routes/activity.js
const express = require('express');
const router = express.Router();
const Activity = require('../Models/Activity');
//const verifyToken = require('../middleware/auth');

// Create an activity record
router.post('/', async (req, res) => {
  const { userId,url, hostname, path, startTime, endTime, duration } = req.body;

  try {
    const newActivity = new Activity({
      userId,
      url,
      hostname,
      path,
      startTime,
      endTime,
      duration
    });

    const activity = await newActivity.save();
    res.json(activity);
  } catch (err) {
    console.error('Error creating activity record:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
