const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../Models/User');
const Activity = require('../Models/Activity');
const verifyToken = require('../middleware/verifyToken');

// @route    GET api/users/me
// @desc     Get current user details and activities
// @access   Private
router.get('/me', verifyToken, async (req, res) => {
  try {
    // Get the user ID from the token
    const userId = req.user.id;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the activities for the user
    const activities = await Activity.find({ userId });

    // Transform the activities to the required format
    const transformedActivities = activities.map(activity => {
      const hostname = activity.hostname.replace(/^www\./, '');
      const path = activity.path.replace(/^www\./, '');
      return {
        hostname,
        duration: activity.duration,
        path,
        startTime: activity.startTime,
        endTime: activity.endTime
      };
    });

    // Calculate total durations
    const totalDurations = {
      productive: 0,
      entertainment: 0,
      distractive: 0
    };

    transformedActivities.forEach(activity => {
      if (user.productiveSites.includes(activity.hostname)) {
        totalDurations.productive += activity.duration;
      } else if (user.entertainmentSites.includes(activity.hostname)) {
        totalDurations.entertainment += activity.duration;
      } else if (user.distractiveSites.includes(activity.hostname)) {
        totalDurations.distractive += activity.duration;
      }
    });

    // Return the user's name, activities, restricted sites, and total durations
    res.json({
      name: user.name,
      activities: transformedActivities,
      restrictedSites: user.restrictedSites,
      productiveSites: user.productiveSites,
      distractiveSites: user.distractiveSites,
      entertainmentSites: user.entertainmentSites,
      totalDurations
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



router.post('/restrict',  async (req, res) => {
  const { hostname } = req.body;
  const userId = req.user.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure user.restrictedWebsites is initialized as an array
    if (!user.restrictedSites) {
      user.restrictedSites = [];
    }

    // Check if the hostname is already in the restricted list
    if (user.restrictedSites.includes(hostname)) {
      return res.status(400).json({ message: 'Hostname already restricted' });
    }

    // Add the hostname to the restricted list
    user.restrictedSites.push(hostname);
    await user.save();

    res.status(200).json({ message: 'Hostname restricted successfully' });
  } catch (error) {
    console.error('Error restricting hostname:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE request to remove a restricted hostname
router.delete('/restrict/:hostname', verifyToken, (req, res) => {
  // Here you can handle the deletion logic
  const hostnameToDelete = req.params.hostname;
   console.log(hostnameToDelete);
  // Example: Remove hostname from user's restricted list in the database
  console.log(req.user.id +"hi");
  User.findOneAndUpdate(
    { _id: req.user.id },
    { $pull: { restrictedSites: hostnameToDelete } },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'Hostname deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting hostname:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/categorise/:category', verifyToken, async (req, res) => {
  const { hostname } = req.body;
  const category = req.params.category;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const categoryField = `${category}Sites`;

    if (!user[categoryField]) {
      user[categoryField] = [];
    }
    console.log("hi"+user.productiveSites);
    if (user.productiveSites.includes(hostname)||user.entertainmentSites.includes(hostname)||user.distractiveSites.includes(hostname)) {
      return res.status(400).json({ message: 'Hostname already in category' });
    }

    user[categoryField].push(hostname);
    await user.save();

    res.status(200).json({ message: 'Hostname added to category successfully' });
  } catch (error) {
    console.error('Error adding hostname to category:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to remove a hostname from a category
router.delete('/categorise/:category/:hostname', verifyToken, async (req, res) => {
  const category = req.params.category;
  const hostname = req.params.hostname;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const categoryField = `${category}Sites`;

    if (!user[categoryField]) {
      return res.status(400).json({ message: 'Category not found' });
    }

    user[categoryField] = user[categoryField].filter(site => site !== hostname);
    await user.save();

    res.status(200).json({ message: 'Hostname removed from category successfully' });
  } catch (error) {
    console.error('Error removing hostname from category:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/id', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ userId: user._id });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
