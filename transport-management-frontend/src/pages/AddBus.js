import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const AddBus = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    numberPlate: '',
    capacity: '',
    driverName: '',
    driverContact: '',
    driverLicense: '',
    cleanerName: '',
    cleanerContact: '',
    inchargeName: '',
    inchargeContact: '',
    inchargeEmail: '',
    routeId: ''
  });

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/routes');
        setRoutes(res.data);
      } catch (err) {
        console.error('Error fetching routes:', err.message);
      }
    };
    fetchRoutes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/buses', formData);
      navigate('/buses');
    } catch (err) {
      console.error('Error adding bus:', err.message);
    }
  };

  return (
    <div className="add-bus-container">
      <h2 className="form-title"> Add New Bus</h2>
      <form className="add-bus-form" onSubmit={handleSubmit}>
        <input type="text" name="numberPlate" placeholder="Number Plate" value={formData.numberPlate} onChange={handleChange} required />
        <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required />
        <input type="text" name="driverName" placeholder="Driver Name" value={formData.driverName} onChange={handleChange} required />
        <input type="text" name="driverContact" placeholder="Driver Contact" value={formData.driverContact} onChange={handleChange} required />
        <input type="text" name="driverLicense" placeholder="Driver License" value={formData.driverLicense} onChange={handleChange} required />
        <input type="text" name="cleanerName" placeholder="Cleaner Name" value={formData.cleanerName} onChange={handleChange} />
        <input type="text" name="cleanerContact" placeholder="Cleaner Contact" value={formData.cleanerContact} onChange={handleChange} />
        <input type="text" name="inchargeName" placeholder="Incharge Name" value={formData.inchargeName} onChange={handleChange} required />
        <input type="text" name="inchargeContact" placeholder="Incharge Contact" value={formData.inchargeContact} onChange={handleChange} required />
        <input type="email" name="inchargeEmail" placeholder="Incharge Email" value={formData.inchargeEmail} onChange={handleChange} />

        <select name="routeId" value={formData.routeId} onChange={handleChange} required>
          <option value=""> Select Route</option>
          {routes.map((route) => (
            <option key={route._id} value={route._id}>
              {route.routeName}
            </option>
          ))}
        </select>

        <button type="submit" className="submit-btn"> Add Bus</button>
      </form>
    </div>
  );
};

export default AddBus;
