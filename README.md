# Task-Manager-with-Authentication

A full-stack **Task Manager** application built using the **MERN Stack** that enables users to securely manage their daily tasks with authentication and task status tracking.

## Features

* Secure user authentication with **Register**, **Login**, and **Reset Password**.
* Create tasks by providing a **title**, **description**, and **due date**.
* Newly created tasks are automatically added to the **Upcoming Tasks** page.
* Edit and delete tasks from the Upcoming Tasks page.
* Mark tasks as **Completed**, which automatically moves them to the **Completed Tasks** page.
* Tasks that are not completed before their due date are automatically moved to the **Missed Tasks** page.
* Secure logout functionality.

## Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js & Express.js
* **Database:** MongoDB Atlas
* **HTTP Client:** Axios
* **Authentication:** JWT-based authentication

## Project Overview

This application is developed using **React.js** for the frontend and **Node.js with Express.js** for the backend. **Axios** is used to fetch and send data between the frontend and backend through REST APIs. **MongoDB Atlas** is used as the cloud database to store user accounts and task information securely. The application provides an intuitive interface for creating, updating, tracking, and managing tasks based on their status, helping users stay organized and manage their work efficiently.
