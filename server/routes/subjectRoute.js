// routes/subjectRoutes.js
const express = require('express');
const Subject = require('../models/Subject');
const Assignment = require('../models/Assignment');
const router = express.Router();

// Route to fetch all subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find().populate('assignments', 'title');
    res.status(200).json({ status: true, msg: 'Subjects fetched successfully', subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ status: false, msg: 'Error fetching subjects' });
  }
});

// Route to fetch all assignments for a given subject
router.get('/subjects/:subjectId/assignments', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await Subject.findById(subjectId).populate('assignments');

    if (!subject) {
      return res.status(404).json({ status: false, msg: 'Subject not found' });
    }

    res.status(200).json({
      status: true,
      msg: 'Assignments fetched successfully',
      assignments: subject.assignments
    });
  } catch (error) {
    console.error('Error fetching assignments for subject:', error);
    res.status(500).json({ status: false, msg: 'Error fetching assignments for subject' });
  }
});

module.exports = router;
