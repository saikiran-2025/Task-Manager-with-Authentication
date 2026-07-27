import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Ct from "./Ct";

const Nav = () => {
  const { token } = useContext(Ct);

  return (
    <nav className={`info-nav ${token ? "logged-in" : "logged-out"}`}>
      
      {/* Logo & Title */}
      <div className="title">
        <i className="fa-solid fa-clipboard-list"></i>
        <span>Task Manager with Authentication</span>
      </div>

      {/* Navigation Links (Visible only after login) */}
      {token && (
        <div className="nav-links">
          <Link to="/addtask">
            <i className="fa-solid fa-plus"></i>
            <span>Add Task</span>
          </Link>

          <Link to="/upcomingtask">
            <i className="fa-solid fa-hourglass-half"></i>
            <span>Upcoming</span>
          </Link>

          <Link to="/completedtask">
            <i className="fa-solid fa-circle-check"></i>
            <span>Completed</span>
          </Link>

          <Link to="/missedtask">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>Missed</span>
          </Link>

          <Link to="/logout">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </Link>
        </div>
      )}

    </nav>
  );
};

export default Nav;