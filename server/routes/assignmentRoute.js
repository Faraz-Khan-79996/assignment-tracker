const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment'); // Path to your Assignment model
const { verifyAccessToken } = require("../middlewares.js");
const { getAssignments, getAssignment, updateAssignmentStatus } = require('../controllers/assignmentController.js');
// Route: Save an array of assignments
router.post('/assignments', async (req, res) => {
  try {
    const assignments = req.body.assignments; // Expecting an array of assignments in the request body

    if (!Array.isArray(assignments) || assignments.length === 0) {
      return res.status(400).json({ error: "Invalid input. 'assignments' must be a non-empty array." });
    }

    // Insert assignments into the database
    const savedAssignments = await Assignment.insertMany(assignments);

    res.status(201).json({
      message: 'Assignments saved successfully!',
      data: savedAssignments,
    });
  } catch (error) {
    console.error('Error saving assignments:', error);
    res.status(500).json({
      error: 'An error occurred while saving assignments.',
      details: error.message,
    });
  }
});


// Routes beginning with /api/assignment
router.get("/", getAssignments);
router.get("/:assignmentId", getAssignment);
router.put("/:assignmentId", verifyAccessToken, updateAssignmentStatus);


module.exports = router;
