// src/Comp/Completed_task.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const Completed_task = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const fetchCompletedTasks = async () => {
    try {
      setError("");

      const res = await axios.get("http://localhost:3000/tasks/completed");

      setTasks(res.data.tasks || []);
      setMsg(res.data.msg || "Completed tasks fetched successfully");
    } catch (err) {
      console.error(err);
      setError("Error fetching completed tasks");
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <div className="completed-page">
      <div className="completed-card">
        <h2 className="completed-title">
          <i className="fa-solid fa-check-double"></i> Completed Tasks
        </h2>

        {error && (
          <div className="completed-error">
            {error}
          </div>
        )}

        {msg && (
          <div className="completed-success">
            {msg}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="completed-empty">
            <i className="fa-regular fa-circle-check"></i>
            <p>No completed tasks yet.</p>
          </div>
        ) : (
          <table className="completed-table">
            <thead className="completed-table-head">
              <tr>
                <th>
                  <i className="fa-solid fa-heading"></i> Title
                </th>

                <th>
                  <i className="fa-solid fa-align-left"></i> Description
                </th>

                <th>
                  <i className="fa-solid fa-calendar-check"></i> Completed On
                </th>

                <th>
                  <i className="fa-solid fa-flag-checkered"></i> Status
                </th>
              </tr>
            </thead>

            <tbody className="completed-table-body">
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="completed-row"
                >
                  <td className="completed-text">
                    {task.tasktitle}
                  </td>

                  <td className="completed-text">
                    {task.description}
                  </td>

                  <td className="completed-date">
                    {new Date(task.dueDate).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>

                  <td>
                    <span className="completed-status">
                      <i className="fa-solid fa-circle-check"></i>{" "}
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

export default Completed_task;