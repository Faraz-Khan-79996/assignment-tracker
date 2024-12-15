const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });


const mongoUrl = process.env.MONGODB_URL;

const assignments = [
    {
        subject: "Maths",
        name: "Linear Equations",
        number: 5,
        description: "Solve the following linear equations and graph their solutions.",
        content: "<p><strong>Task:</strong> Solve the equations:<br>1. 2x + 3y = 6<br>2. x - y = 4<br>Plot the solutions on a graph and find their intersection.</p>",
        lastDateOfSubmission: "2024-12-19T00:00:00.000Z",
    },
    {
        subject: "Maths",
        name: "Integration Basics",
        number: 6,
        description: "Find the integral of the given functions and explain their applications.",
        content: "<p><strong>Task:</strong> Compute the following integrals:<br>1. ∫(3x^2 + 5x)dx<br>2. ∫(sin(x) + cos(x))dx<br>Discuss their significance in calculating areas and other real-world applications.</p>",
        lastDateOfSubmission: "2024-12-21T00:00:00.000Z",
    }
    ,

    {
        subject: "English",
        name: "Narrative Writing",
        number: 3,
        description: "Write a short narrative on a memorable day in your life.",
        content: "<p><strong>Instructions:</strong> Use descriptive language to bring your story to life. Focus on emotions, events, and vivid details. Aim for 500-700 words.</p>",
        lastDateOfSubmission: "2024-12-18T00:00:00.000Z",
    },
    {
        subject: "English",
        name: "Book Review",
        number: 4,
        description: "Review the novel 'To Kill a Mockingbird' by Harper Lee.",
        content: "<p><strong>Task:</strong> Analyze the book's themes, characters, and relevance to society. Discuss how it addresses issues of justice and morality.</p>",
        lastDateOfSubmission: "2024-12-22T00:00:00.000Z",
    }
    ,

    {
        subject: "Physics",
        name: "Introduction to Gravity",
        number: 1,
        description: "Learn the basics of gravity and its influence on planetary motion.",
        content: "<p><strong>Gravity</strong> is a force that attracts two bodies towards each other. Learn how Newton's law of gravitation explains the motion of planets and how it applies to our daily life. Discuss practical examples.</p>",
        lastDateOfSubmission: "2024-12-20T00:00:00.000Z",
    },
    {
        subject: "Physics",
        name: "Electromagnetic Waves",
        number: 2,
        description: "Understand the properties and applications of electromagnetic waves.",
        content: "<p><strong>Electromagnetic waves</strong> consist of oscillating electric and magnetic fields. Study their spectrum, applications (radio waves, X-rays, etc.), and how they enable wireless communication.</p>",
        lastDateOfSubmission: "2024-12-25T00:00:00.000Z",
    },
    {
        subject: "Algorithms",
        name: "Sorting Algorithms Overview",
        number: 1,
        description: "Understand and implement Bubble Sort, Merge Sort, and Quick Sort.",
        content: "<p><strong>Task:</strong> Implement the three sorting algorithms and compare their performance on various datasets.</p>",
        lastDateOfSubmission: "2024-12-25T00:00:00.000Z",
      },
      {
        subject: "Algorithms",
        name: "Graph Traversal Techniques",
        number: 2,
        description: "Learn and apply BFS and DFS traversal techniques.",
        content: "<p><strong>Task:</strong> Implement BFS and DFS on a given graph and document their traversal order.</p>",
        lastDateOfSubmission: "2024-12-30T00:00:00.000Z",
      },
      {
        subject: "History",
        name: "World War II Key Events",
        number: 1,
        description: "Analyze the major events of World War II.",
        content: "<p><strong>Task:</strong> Create a timeline of the events leading to the end of World War II.</p>",
        lastDateOfSubmission: "2024-12-20T00:00:00.000Z",
      },
      {
        subject: "History",
        name: "The Renaissance Movement",
        number: 2,
        description: "Explore the key contributions of the Renaissance to art and science.",
        content: "<p><strong>Task:</strong> Write a report on how the Renaissance changed perspectives in Europe.</p>",
        lastDateOfSubmission: "2024-12-22T00:00:00.000Z",
      },          
];

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Database connected!');
        await Assignment.insertMany(assignments);
        console.log('Assignments added!');
        mongoose.disconnect();
    })
    .catch(err => console.error('Error:', err));
