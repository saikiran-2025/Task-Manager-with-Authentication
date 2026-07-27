// controllers/addtask.js
const Task = require("../models/usertask"); // adjust path if needed

const addTask = async (req, res) => {
  try {
    const { tasktitle, description, dueDate } = req.body;

    // Basic validation
    if (!tasktitle || !description || !dueDate) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Convert string to Date (optional; Mongoose can also do this)
    const due = new Date(dueDate);
    if (isNaN(due.getTime())) {
      return res.status(400).json({ msg: "Invalid dueDate format" });
    }

    const newTask = new Task({
      tasktitle,
      description,
      dueDate: due,      // full date & time
      // status omitted -> default 'upcoming' from schema
    });

    await newTask.save();

    return res.status(201).json({
      msg: "Task added successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ msg: "Error adding task" });
  }
};

module.exports = { addTask };