// src/Comp/Missed_task.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const Missed_task = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const fetchMissedTasks = async () => {
    try {
      setError("");

      const res = await axios.get("https://task-manager-with-authentication-backend.onrender.com/tasks/missed");

      setTasks(res.data.tasks || []);
      setMsg(res.data.msg || "Missed tasks fetched successfully");
    } catch (err) {
      console.error(err);
      setError("Error fetching missed tasks");
    }
  };

  useEffect(() => {
    fetchMissedTasks();
  }, []);

  return (
    <div className="missed-page">
      <div className="missed-card">
        <h2 className="missed-title">
          <i className="fa-solid fa-triangle-exclamation"></i> Missed Tasks
        </h2>

        {error && (
          <div className="missed-error">
            {error}
          </div>
        )}

        {msg && (
          <div className="missed-success">
            {msg}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="missed-empty">
            <i className="fa-regular fa-face-smile"></i>
            <p>No missed tasks. Great job!</p>
          </div>
        ) : (
          <table className="missed-table">
            <thead className="missed-table-head">
              <tr>
                <th>
                  <i className="fa-solid fa-heading"></i> Title
                </th>

                <th>
                  <i className="fa-solid fa-align-left"></i> Description
                </th>

                <th>
                  <i className="fa-solid fa-clock"></i> Due Date & Time
                </th>

                <th>
                  <i className="fa-solid fa-circle-exclamation"></i> Status
                </th>
              </tr>
            </thead>

            <tbody className="missed-table-body">
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="missed-row"
                >
                  <td className="missed-text">
                    {task.tasktitle}
                  </td>

                  <td className="missed-text">
                    {task.description}
                  </td>

                  <td className="missed-date">
                    {new Date(task.dueDate).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>

                  <td>
                    <span className="missed-status">
                      <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                      {task.status}
                    </span>
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

export default Missed_task;
