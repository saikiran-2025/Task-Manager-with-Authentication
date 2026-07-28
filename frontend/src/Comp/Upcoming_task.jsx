// src/Comp/Upcoming_task.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upcoming_task = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const navigate = useNavigate();

  const toLocalDateTimeInput = (dateValue) => {
    const d = new Date(dateValue);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const fetchTasks = async () => {
    try {
      setError("");

      const res = await axios.get("https://task-manager-with-authentication-backend.onrender.com/tasks/upcoming");

      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching upcoming tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.tasktitle);
    setEditDescription(task.description);
    setEditDueDate(toLocalDateTimeInput(task.dueDate));
    setEditStatus("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditDueDate("");
    setEditStatus("");
  };

  const saveEdit = async (id) => {
    try {
      setError("");
      setMsg("");

      const payload = {
        tasktitle: editTitle,
        description: editDescription,
        dueDate: new Date(editDueDate).toISOString(),
      };

      if (editStatus === "completed") {
        payload.status = "completed";
      }

      const res = await axios.put(
        `http://localhost:3000/tasks/${id}`,
        payload
      );

      setMsg(res.data.msg || "Task updated successfully");

      if (editStatus === "completed") {
        navigate("/completedtask");
      } else {
        cancelEdit();
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error updating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      setError("");
      setMsg("");

      const res = await axios.delete(`https://task-manager-with-authentication-backend.onrender.com/tasks/${id}`);

      setMsg(res.data.msg || "Task deleted successfully");

      fetchTasks();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error deleting task");
    }
  };

  return (
    <div className="upcoming-page">
      <div className="upcoming-card">
        <h2 className="upcoming-title">
          <i className="fa-solid fa-list-check"></i> Upcoming Tasks
        </h2>

        {error && (
          <div className="upcoming-error">
            {error}
          </div>
        )}

        {msg && (
          <div className="upcoming-success">
            {msg}
          </div>
        )}

        {tasks.length === 0 ? (
          <p className="upcoming-empty">
            No upcoming tasks.
          </p>
        ) : (
          <table className="upcoming-table">
            <thead className="upcoming-table-head">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="upcoming-table-body">
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="upcoming-row"
                >
                  <td>
                    {editingId === task._id ? (
                      <input
                        className="upcoming-input"
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    ) : (
                      <span className="upcoming-text">
                        {task.tasktitle}
                      </span>
                    )}
                  </td>

                  <td>
                    {editingId === task._id ? (
                      <textarea
                        className="upcoming-textarea"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    ) : (
                      <span className="upcoming-text">
                        {task.description}
                      </span>
                    )}
                  </td>

                  <td>
                    {editingId === task._id ? (
                      <input
                        className="upcoming-input"
                        type="datetime-local"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                      />
                    ) : (
                      <span className="upcoming-date">
                        {new Date(task.dueDate).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </span>
                    )}
                  </td>

                  <td>
                    {editingId === task._id ? (
                      <select
                        className="upcoming-select"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="">--Select--</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : (
                      <span className="upcoming-status">
                        {task.status}
                      </span>
                    )}
                  </td>

                  <td className="upcoming-actions">
                    {editingId === task._id ? (
                      <>
                        <button
                          className="upcoming-save-btn"
                          onClick={() => saveEdit(task._id)}
                        >
                          <i className="fa-solid fa-floppy-disk"></i> Save
                        </button>

                        <button
                          className="upcoming-cancel-btn"
                          onClick={cancelEdit}
                        >
                          <i className="fa-solid fa-xmark"></i> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="upcoming-edit-btn"
                          onClick={() => startEdit(task)}
                        >
                          <i className="fa-solid fa-pen"></i> Edit
                        </button>

                        <button
                          className="upcoming-delete-btn"
                          onClick={() => deleteTask(task._id)}
                        >
                          <i className="fa-solid fa-trash"></i> Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Upcoming_task;
