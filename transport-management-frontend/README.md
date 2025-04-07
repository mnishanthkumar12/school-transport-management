# School Transport Management System

A full-featured MERN stack web application to manage school bus transportation with real-time tracking, QR-based check-in, role-based dashboards, notifications, and more.

## Features

-  Role-Based Login  (Admin, Student, Bus Incharge)
-  Bus & Route Management 
-  Student Transport Registration 
-  Live Bus Tracking  (with Socket.io + Map integration)
-  Real-Time Notifications  (bus approaching alerts)
-  QR Code Check-in/Check-out  (for student attendance)
-  Admin,Incharge,Parent Map View 

---

##  Tech Stack

-  Frontend : React.js
-  Backend : Node.js + Express
-  Database : MongoDB (Mongoose)
-  Real-Time : Socket.io
-  Map : Leaflet.js
-  QR Code : qrcode.react

# Backend
cd school-transport-backend
npm install
npm start

MONGO_URI=mongodb://127.0.0.1:27017/school_transport
PORT=5000

# Frontend
cd transport-management-frontend
npm install
npm start

http://localhost:3000

 Admin: mnishanth332@gmail.com	123456
Incharge: rohith@gmail.com	123456

# Security & Best Practices
Passwords are hashed (bcrypt)
JWT-based authentication
Role-based authorization
Input validations included

# Features by Role

# Student Dashboard
View assigned bus & route
Scan QR to check-in
Track bus location
Get alerts when bus is nearby

# Incharge Dashboard
View student list
Send live bus location
Scan QR to mark attendance

# Admin Panel
Manage buses, students, routes
Assign personnel
Track all buses in real-time
View reports (occupancy, attendance)

# Developer: M.Nishanth
📧 mnishanthkumar9@gmail.com