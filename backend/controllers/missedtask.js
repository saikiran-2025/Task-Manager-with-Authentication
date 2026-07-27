// controllers/missedtask.js
const Task = require("../models/usertask"); // adjust path if needed

// 1) Mark overdue upcoming tasks as "missed"
// 2) Return all tasks with status "missed"
const getMissedTasks = async (req, res) => {
  try {
    const now = new Date();

    // Step 1: update overdue upcoming tasks to missed
    await Task.updateMany(
      {
        status: "upcoming",
        dueDate: { $lt: now },      // dueDate earlier than now
      },
      {
        $set: { status: "missed" },
      }
    );

    // Step 2: fetch all missed tasks
    const missedTasks = await Task.find({ status: "missed" }).sort({ dueDate: 1 });

    return res.status(200).json({
      msg: "Missed tasks fetched successfully",
      tasks: missedTasks,
    });
  } catch (error) {
    console.error("Error fetching missed tasks:", error);
    return res.status(500).json({ msg: "Error fetching missed tasks" });
  }
};

module.exports = { getMissedTasks };