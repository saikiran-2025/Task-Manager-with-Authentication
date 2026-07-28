// src/Comp/Reset_pwd.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Reset_pwd = () => {
  const [email, setEmail] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMsg("");

    if (!email || !newPwd || !confirmPwd) {
      setError("Please fill all fields.");
      return;
    }

    if (newPwd !== confirmPwd) {
      setError("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const res = await axios.post("https://task-manager-with-authentication-backend.onrender.com/reset", {
        email,
        new_pwd: newPwd,
        confirm_pwd: confirmPwd,
      });

      setMsg(res.data.message || "Password reset successfully.");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error resetting password.");
      }
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <form
          className="reset-form"
          onSubmit={handleSubmit}
        >
          <h2 className="reset-title">
            <i className="fa-solid fa-key"></i>
            Reset Password
          </h2>

          {error && (
            <div className="reset-error">
              {error}
            </div>
          )}

          {msg && (
            <div className="reset-success">
              {msg}
            </div>
          )}

          {/* Email */}
          <div className="reset-field">
            <div className="reset-input-box">
              <input
                className="reset-input"
                type="email"
                placeholder="Enter your registered e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <i className="fa-solid fa-envelope reset-icon"></i>
            </div>
          </div>

          {/* New Password */}
          <div className="reset-field">
            <div className="reset-input-box">
              <input
                className="reset-input"
                type={showNewPwd ? "text" : "password"}
                placeholder="Enter new password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />

              <i
                className={`reset-icon fa-solid ${
                  showNewPwd ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setShowNewPwd(!showNewPwd)}
              ></i>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="reset-field">
            <div className="reset-input-box">
              <input
                className="reset-input"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />

              <i
                className={`reset-icon fa-solid ${
                  showConfirmPwd ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
              ></i>
            </div>
          </div>

          <button
            className="reset-btn"
            type="submit"
          >
            <i className="fa-solid fa-key"></i>
            Reset Password
          </button>

          <div className="reset-footer">
            <p>
              Remember your password?
              <Link to="/"> Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset_pwd;
