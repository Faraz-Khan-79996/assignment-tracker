// models/Subject.js
const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);