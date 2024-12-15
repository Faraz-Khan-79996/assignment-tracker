const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the assignment name'],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Please enter the subject name'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
  },
  lastDateOfSubmission: {
    type: Date,
    required: [true, 'Please enter the last date of submission'],
  },
  content: {
    type: String, // Rich text for assignment content
    required: [true, 'Please enter assignment content'],
  },
  completedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
}, {
  timestamps: true,
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
