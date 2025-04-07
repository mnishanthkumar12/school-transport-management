import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title"> School Transport Dashboard</h2>

      <div className="track-section">
        <Link to="/admin-tracker">
          <button className="track-button"> Track All Buses</button>
        </Link>
      </div>

      <div className="dashboard-grid">
        <Link to="/buses"><button className="dashboard-btn"> View Buses</button></Link>
        <Link to="/students"><button className="dashboard-btn"> View Students</button></Link>
        <Link to="/routes"><button className="dashboard-btn"> View Routes</button></Link>
        <Link to="/add-bus"><button className="dashboard-btn"> Add Bus</button></Link>
        <Link to="/add-student"><button className="dashboard-btn"> Add Student</button></Link>
        <Link to="/add-route"><button className="dashboard-btn"> Add Route</button></Link>
      </div>
    </div>
  );
};

export default Dashboard;
