// src/Comp/Logout.jsx
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Ct from "./Ct";

const Logout = () => {
  const { user, setUser, setToken } = useContext(Ct);
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        // Optional: call backend logout if you really need it
        if (user && user.email) {
          await axios.post(
            `https://task-manager-with-authentication-backend.onrender.com/logout/${encodeURIComponent(user.email)}`
          );
        }

        // Clear client auth state
        setToken("");
        setUser(null);

        // Go to login page
        navigate("/");
      } catch (err) {
        console.error("Logout error:", err);
        // Even if server fails, clear local state and navigate
        setToken("");
        setUser(null);
        navigate("/");
      }
    };

    doLogout();
  }, [user, setToken, setUser, navigate]);

  return (
    <div className="logout-container">
      <h2>
        <i className="fa-solid fa-right-from-bracket"></i> Logging out...
      </h2>
    </div>
  );
};

export default Logout;
