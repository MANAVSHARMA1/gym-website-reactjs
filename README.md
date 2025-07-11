FitFlex Gym Management System - Project Documentation
 Project Overview
FitFlex Gym Management System is a full-stack web application built using ReactJS (frontend), PHP (REST API), and MySQL (database). It offers membership management, user registration/login, contact inquiry handling, and a professional admin dashboard for managing users and plans.
 GitHub Repository
Repository URL: https://github.com/MANAVSHARMA1/gym-website-reactjs
 Project Structure

gym-website-reactjs/
│
├── gym-website-reactjs/       -> React Frontend (without node_modules)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│
├── gym_api/                   -> PHP REST API Folder
│   ├── config.php
│   ├── membership_plans.php
│   ├── register_user.php
│   ├── login_user.php
│   ├── contact_add.php
│   ├── contact_get.php
│   └── upload_image.php
│
├── gym_database.sql           -> MySQL DB File
├── README.md

 Features
- Responsive ReactJS Frontend with Bootstrap
- Admin Dashboard to manage plans, users, and contacts
- User Registration and Login system
- Contact form to collect user inquiries
- API-based architecture using PHP
 Installation Guide
Backend Setup (PHP API)
- Install XAMPP/WAMP
- Copy `gym_api` to `htdocs` folder
- Import `gym_database.sql` into phpMyAdmin
- Example API Endpoint: http://localhost/gym_api/membership_plans.php
Frontend Setup (React)
1. Navigate to React project folder:
   cd gym-website-reactjs
2. Install dependencies:
   npm install
3. Start React app:
   npm start
React App runs at: http://localhost:3000
Developer Info
Developed by Manav Sharma
GitHub: https://github.com/MANAVSHARMA1
License
This project is licensed under the MIT License.
