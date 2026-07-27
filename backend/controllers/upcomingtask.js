// controllers/upcomingtask.js
const Task = require("../models/usertask"); // adjust path if needed


const getUpcomingTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: "upcoming" }).sort({ dueDate: 1 });
    return res.status(200).json({
      msg: "Upcoming tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching upcoming tasks:", error);
    return res.status(500).json({ msg: "Error fetching upcoming tasks" });
  }
};

// Edit / update a task (title, description, dueDate, status)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // task id from URL
    const { tasktitle, description, dueDate, status } = req.body;

    // Optional: basic validation
    if (!tasktitle || !description || !dueDate) {
      return res.status(400).json({ msg: "tasktitle, description, and dueDate are required" });
    }

    // Ensure status is one of the allowed values (if provided)
    const allowedStatus = ["upcoming", "completed", "incompleted", "missed"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        tasktitle,
        description,
        dueDate: new Date(dueDate), // keep full date & time
        ...(status && { status }),  // only update status if provided
      },
      {
        new: true,           // return the updated document
        runValidators: true, // respect schema validation
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json({
      msg: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ msg: "Error updating task" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // task id from URL

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json({
      msg: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ msg: "Error deleting task" });
  }
};

module.exports = { updateTask, deleteTask ,getUpcomingTasks};