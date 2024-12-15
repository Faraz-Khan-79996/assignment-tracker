const express = require('express');
const User = require('../models/User'); // Assuming the User model is in models folder
const router = express.Router();
const { verifyAccessToken } = require("../middlewares.js");

// GET all users (for leaderboard)
router.get('/', async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();

    // Calculate the score for each user based on the number of completed assignments
    const usersWithScores = users.map(user => ({
      ...user.toObject(),
      score: user.completedAssignments.length * 10, // 10 points per completed assignment
    }));

    // Sort users by score in descending order
    const sortedUsers = usersWithScores.sort((a, b) => b.score - a.score);

    res.status(200).json({ status: true, users: sortedUsers, msg: "Users fetched successfully." });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
});

module.exports = router;
