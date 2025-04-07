
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'; 

const user = JSON.parse(localStorage.getItem('user'));

const BusList = () => {
  const [buses, setBuses] = useState([]);

  const fetchBuses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/buses');
      setBuses(res.data);
    } catch (err) {
      console.error('Error fetching buses:', err.message);
    }
  };

  const deleteBus = async (id) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        await axios.delete(`http://localhost:5000/api/buses/${id}`);
        fetchBuses();
      } catch (err) {
        console.error('Error deleting bus:', err.message);
      }
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div className="bus-list-container">
      <h2 className="bus-list-title"> All Buses</h2>
      <div className="table-wrapper">
        <table className="bus-table">
          <thead>
            <tr>
              <th>Number Plate</th>
              <th>Capacity</th>
              <th>Driver</th>
              <th>Incharge</th>
              <th>Route</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td>{bus.numberPlate}</td>
                <td>{bus.capacity}</td>
                <td>{bus.driverName} <br />({bus.driverContact})</td>
                <td>{bus.inchargeName} <br />({bus.inchargeContact})</td>
                <td>{bus.routeId?.routeName || 'Not Assigned'}</td>
                <td className="action-buttons">
                  <Link to={`/edit-bus/${bus._id}`}>
                    <button className="edit-btn" disabled={user?.role !== 'admin'}>Edit</button>
                  </Link>
                  <button className="delete-btn" disabled={user?.role !== 'admin'} onClick={() => deleteBus(bus._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusList;
