// src/Comp/Add_task.jsx

import React, { useState } from "react";
import axios from "axios";

const Add_task = () => {
  const [tasktitle, setTasktitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDateLocal, setDueDateLocal] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMsg("");

    if (!tasktitle || !description || !dueDateLocal) {
      setError("All fields are required");
      return;
    }

    try {
      const dueDateIso = new Date(dueDateLocal).toISOString();

      const res = await axios.post("https://task-manager-with-authentication-backend.onrender.com/addtask", {
        tasktitle,
        description,
        dueDate: dueDateIso,
      });

      setMsg(res.data.msg || "Task added successfully");

      setTasktitle("");
      setDescription("");
      setDueDateLocal("");
    } catch (err) {
      console.error(err);

      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Error adding task");
      }
    }
  };

  return (
    <div className="addtask-page">
      <div className="addtask-card">
        <h2 className="addtask-title">
          <i className="fa-solid fa-calendar-plus"></i>
          Add Task
        </h2>

        {error && (
          <div className="addtask-error">
            {error}
          </div>
        )}

        {msg && (
          <div className="addtask-success">
            {msg}
          </div>
        )}

        <form
          className="addtask-form"
          onSubmit={handleSubmit}
        >
          {/* Task Title */}
          <div className="addtask-field">
            <label className="addtask-label">
              Task Title
            </label>

            <div className="addtask-input-box">
              <input
                className="addtask-input"
                type="text"
                placeholder="Enter task title"
                value={tasktitle}
                onChange={(e) => setTasktitle(e.target.value)}
              />

              <i className="fa-solid fa-heading addtask-icon"></i>
            </div>
          </div>

          {/* Description */}
          <div className="addtask-field">
            <label className="addtask-label">
              Description
            </label>

            <div className="addtask-input-box">
              <textarea
                className="addtask-textarea"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <i className="fa-solid fa-align-left addtask-icon"></i>
            </div>
          </div>

          {/* Due Date */}
          <div className="addtask-field">
            <label className="addtask-label">
              Due Date & Time
            </label>

            <div className="addtask-input-box">
              <input
                className="addtask-input"
                type="datetime-local"
                value={dueDateLocal}
                onChange={(e) => setDueDateLocal(e.target.value)}
              />

              <i className="fa-solid fa-calendar-days addtask-icon"></i>
            </div>
          </div>

          <button
            className="addtask-btn"
            type="submit"
          >
            <i className="fa-solid fa-plus"></i>
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_task;
