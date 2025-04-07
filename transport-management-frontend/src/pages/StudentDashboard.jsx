import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import StudentQR from "./StudentQR"; 

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "student") return;

        const res = await axios.get(`http://localhost:5000/api/students/user/${user.id}`);
        setStudent(res.data);
      } catch (error) {
        console.error("Failed to fetch student:", error);
      }
    };

    fetchStudent();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("busApproachingStop", (data) => {
      if (student?.busId && data.busId === student.busId._id) {
        setNotification(data.message);
        setTimeout(() => setNotification(null), 8000);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [student]);

  if (!student) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const bus = student.busId;
  const busDisplayId = bus && typeof bus === "object" ? bus._id : bus;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-3"> Student Dashboard</h3>

        {notification && (
          <div className="alert alert-warning text-center" role="alert">
             {notification}
          </div>
        )}

        <div className="mb-2"><strong>Name:</strong> {student.name}</div>
        <div className="mb-2"><strong>Class:</strong> {student.grade}</div>
        <div className="mb-3"><strong>Bus ID:</strong> {busDisplayId || "Not assigned"}</div>

        
        <div className="text-center my-3">
          <StudentQR student={student} />
        </div>

        {busDisplayId && (
          <Link to={`/parent-tracker/${busDisplayId}`}>
            <button className="btn btn-primary w-100">
              Track My Bus
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
