// src/Comp/Register.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMsg("");

    if (!fullname || !email || !pwd || !confirmPwd) {
      setError("Need to fill all fields");
      return;
    }

    if (pwd !== confirmPwd) {
      setError("Password and confirm password must match");
      return;
    }

    try {
      const res = await axios.post("https://task-manager-with-authentication-backend.onrender.com/register", {
        fullname,
        email,
        pwd,
        confirmPwd,
      });

      setMsg(res.data.msg || "Registration successful");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {
      console.error(err);

      if (err.response && err.response.data && err.response.data.err) {
        setError(err.response.data.err);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="register-container">

      <form onSubmit={handleSubmit}>

        <h2>
          <i className="fa-solid fa-user-plus"></i> Register
        </h2>

        {error && <p className="error">{error}</p>}
        {msg && <p className="success">{msg}</p>}

        {/* Full Name */}
        <div className="field">
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <i className="fa-solid fa-user"></i>
          </div>
        </div>

        {/* Email */}
        <div className="field">
          <div className="input-with-icon">
            <input
              type="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fa-solid fa-envelope"></i>
          </div>
        </div>

        {/* Password */}
        <div className="field">
          <div className="input-with-icon">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Enter your password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />

            <i
              className={`fa-solid ${
                showPwd ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={() => setShowPwd(!showPwd)}
            ></i>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="field">
          <div className="input-with-icon">
            <input
              type={showConfirmPwd ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />

            <i
              className={`fa-solid ${
                showConfirmPwd ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={() => setShowConfirmPwd(!showConfirmPwd)}
            ></i>
          </div>
        </div>

        <button type="submit">
          <i className="fa-solid fa-user-plus"></i> Register
        </button>

        <div className="register-links">
          <p>
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>
        </div>

      </form>

    </div>
  );
};

export default Register;
