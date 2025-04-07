
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const AddStudent = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    grade: '',
    section: '',
    rollNumber: '',
    boardingPoint: '',
    routePreference: '',
    busId: '',
    feeAmount: '',
    paymentStatus: 'Unpaid',
    userId: '',
  });

  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [studentUsers, setStudentUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/routes')
      .then(res => setRoutes(res.data))
      .catch(err => console.error('Error fetching routes:', err));

    axios.get('http://localhost:5000/api/buses')
      .then(res => setBuses(res.data))
      .catch(err => console.error('Error fetching buses:', err));

    axios.get('http://localhost:5000/api/auth/users?role=student')
      .then(res => setStudentUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/students', student)
      .then(() => navigate('/students'))
      .catch(err => console.error('Error adding student:', err.response?.data || err));
  };

  return (
    <div className="add-student-container">
      <h2 className="form-title"> Add New Student</h2>
      <form className="add-student-form" onSubmit={handleSubmit}>
        <select name="userId" value={student.userId} onChange={handleChange} required>
          <option value="">Select Student User</option>
          {studentUsers.map(user => (
            <option key={user._id} value={user._id}>
              {user.username} ({user.email})
            </option>
          ))}
        </select>

        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Student Name" required />
        <input type="text" name="grade" value={student.grade} onChange={handleChange} placeholder="Grade" required />
        <input type="text" name="section" value={student.section} onChange={handleChange} placeholder="Section" />
        <input type="text" name="rollNumber" value={student.rollNumber} onChange={handleChange} placeholder="Roll Number" />
        <input type="text" name="boardingPoint" value={student.boardingPoint} onChange={handleChange} placeholder="Boarding Point" required />

        <select name="routePreference" value={student.routePreference} onChange={handleChange} required>
          <option value="">Select Route</option>
          {routes.map(route => (
            <option key={route._id} value={route._id}>{route.routeName}</option>
          ))}
        </select>

        <select name="busId" value={student.busId} onChange={handleChange} required>
          <option value="">Select Bus</option>
          {buses.map(bus => (
            <option key={bus._id} value={bus._id}>{bus.numberPlate}</option>
          ))}
        </select>

        <input type="number" name="feeAmount" value={student.feeAmount} onChange={handleChange} placeholder="Bus Fee" required />

        <select name="paymentStatus" value={student.paymentStatus} onChange={handleChange}>
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select>

        <button type="submit" className="submit-btn" disabled={student.paymentStatus !== 'Paid'}>
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
