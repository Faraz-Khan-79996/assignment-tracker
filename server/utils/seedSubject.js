// populateSubjects.js
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Assignment = require('../models/Assignment');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });


const mongoUrl = process.env.MONGODB_URL;

// Connect to your MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

const subjectsData = [
  { name: 'Physics' },
  { name: 'English' },
  { name: 'Maths' },
  { name: 'Algorithms' },
  { name: 'History' },
];

const populateSubjects = async () => {
  try {
    for (const subjectData of subjectsData) {
      // Find or create the subject
      let subject = await Subject.findOne({ name: subjectData.name });
      if (!subject) {
        subject = new Subject({ name: subjectData.name, assignments: [] });
      }

      // Find assignments related to the subject
      const relatedAssignments = await Assignment.find({ subject: subjectData.name });
      const assignmentIds = relatedAssignments.map(assignment => assignment._id);

      // Update the subject's assignments field
      subject.assignments = assignmentIds;
      await subject.save();
    }

    console.log('Subjects populated with assignments successfully');
  } catch (error) {
    console.error('Error populating subjects:', error);
  } finally {
    mongoose.connection.close();
  }
};

populateSubjects();
