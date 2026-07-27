// src/Comp/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Ct from "./Ct";


const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const { setToken, setUser } = useContext(Ct);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !pwd) {
      setError("Need to fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        pwd,
      });

      const { token, email: userEmail, _id } = res.data;

      setToken(token);
      setUser({
        email: userEmail,
        _id,
      });

      navigate("/addtask");
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Error in login");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>
          <i className="fa-solid fa-right-to-bracket"></i> Login
        </h2>

        {error && <p className="error">{error}</p>}

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

        <button type="submit">
          <i className="fa-solid fa-right-to-bracket"></i> Login
        </button>

        <div className="login-links">
          <p>
            <Link to="/resetpwd">Forgot Password?</Link>
          </p>

          <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;