// src/Comp/Footer.jsx

import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-page">
      <div className="footer-wrapper">

        {/* About */}
        <div className="footer-card">
          <h2 className="footer-heading">
            Task Manager – Organize Your Work
          </h2>

          <p className="footer-text">
            Task Manager is a simple and secure application where you can create
            tasks, track upcoming deadlines, mark completed work, and see missed
            tasks in one place.
          </p>

          <p className="footer-text">
            With built-in authentication and clear status for every task, it
            helps you stay productive and never lose track of what needs to be
            done.
          </p>
        </div>

        {/* Features */}
        <div className="footer-card">
          <h3 className="footer-subtitle">
            App Features
          </h3>

          <ul className="footer-list">
            <li className="footer-list-item">
              Add new tasks with due date and description
            </li>

            <li className="footer-list-item">
              View all upcoming tasks in one place
            </li>

            <li className="footer-list-item">
              Mark tasks as completed
            </li>

            <li className="footer-list-item">
              Automatically track missed and overdue tasks
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-card">
          <h3 className="footer-subtitle">
            Support
          </h3>

          <p className="footer-text">
            Email : support@taskmanager.com
          </p>

          <p className="footer-text">
            Location : India
          </p>

          <p className="footer-text">
            Available : Monday - Saturday
          </p>
        </div>

        {/* Social */}
        <div className="footer-card">
          <h3 className="footer-subtitle">
            Follow Us
          </h3>

          <div className="footer-social">
            <a
              href="#"
              className="footer-social-link"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="footer-social-link"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="footer-social-link"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="footer-social-link"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="footer-social-link"
            >
              <FaGithub />
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-bottom-text">
          © {year} Task Manager. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;