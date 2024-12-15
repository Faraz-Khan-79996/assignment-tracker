const Assignment = require('../models/Assignment'); // Path to your Assignment model
const User = require('../models/User');


async function getAssignments(req, res) {
    try {
      const assignments = await Assignment.find();
      res.status(200).json({ assignments, status: true, msg: "assignments found successfully.." });
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }
  

async function getAssignment(req, res) {
    try {
      const { assignmentId } = req.params;
      const assignment = await Assignment.findById(assignmentId);
  
      if (!assignment) {
        return res.status(404).json({ status: false, msg: "Assignment not found" });
      }
  
      res.status(200).json({ assignment, status: true, msg: "assignments found successfully.." });
    } catch (error) {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ status: false, msg: "Error fetching assignment" });
    }
  }

  async function updateAssignmentStatus(req, res) {
    try {
      const { assignmentId } = req.params; // Extract the assignment ID from the route
      const { action } = req.query; // Extract the action from query parameters
      const userId = req.user._id; // User's ID from verifyAccessToken middleware
  
      // Check if the assignment exists
      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) {
        return res.status(404).json({ status: false, msg: "Assignment not found" });
      }
  
      // Fetch the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ status: false, msg: "User not found" });
      }
  
      if (action === "complete") {
        // Mark assignment as completed (add user to completedBy and assignment to completedAssignments)
        if (assignment.completedBy.includes(userId)) {
          return res.status(400).json({ status: false, msg: "Assignment is already marked as completed by you" });
        }
  
        // Add user to the completedBy array of the assignment
        assignment.completedBy.push(userId);
        await assignment.save();
  
        // Add assignment to the completedAssignments array of the user
        user.completedAssignments.push(assignmentId);
        await user.save();
  
        return res.status(200).json({
          status: true,
          msg: "Assignment marked as completed successfully!",
          completedBy: assignment.completedBy,
          completedAssignments: user.completedAssignments
        });
      } else if (action === "pending") {
        // Unmark assignment (remove user from completedBy and assignment from completedAssignments)
        if (!assignment.completedBy.includes(userId)) {
          return res.status(400).json({ status: false, msg: "You haven't marked this assignment as completed" });
        }
  
        // Remove user from the completedBy array of the assignment
        assignment.completedBy = assignment.completedBy.filter(id => id.toString() !== userId.toString());
        await assignment.save();
  
        // Remove assignment from the completedAssignments array of the user
        user.completedAssignments = user.completedAssignments.filter(id => id.toString() !== assignmentId.toString());
        await user.save();
  
        return res.status(200).json({
          status: true,
          msg: "Assignment unmarked as completed successfully!",
          completedBy: assignment.completedBy,
          completedAssignments: user.completedAssignments
        });
      } else {
        return res.status(400).json({ status: false, msg: "Invalid action. Use 'complete' or 'pending'." });
      }
    } catch (error) {
      console.error("Error updating assignment status:", error);
      res.status(500).json({ status: false, msg: "Error updating assignment status" });
    }
  }
  

  module.exports = {
    updateAssignmentStatus,
    getAssignment,
    getAssignments
  }