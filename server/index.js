const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");
const assignmentRoutes = require('./routes/assignmentRoute');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoute')
const subjectRoutes = require('./routes/subjectRoute')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json());
app.use(cors());
app.use(cookieParser())

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, err => {
  if (err) throw err;
  console.log("Mongodb connected...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/subject', subjectRoutes);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
