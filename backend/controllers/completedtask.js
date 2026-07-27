// controllers/completedtask.js
const Task = require("../models/usertask"); // adjust path if needed

// Get all completed tasks
const getCompletedTasks = async (req, res) => {
  try {
    // Find all tasks where status is 'completed'
    const completedTasks = await Task.find({ status: "completed" }).sort({ dueDate: 1 });

    return res.status(200).json({
      msg: "Completed tasks fetched successfully",
      tasks: completedTasks,
    });
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    return res.status(500).json({ msg: "Error fetching completed tasks" });
  }
};

module.exports = { getCompletedTasks };