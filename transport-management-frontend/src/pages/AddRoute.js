
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
const AddRoute = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState({
    routeName: '',
    startPoint: '',
    endPoint: '',
    driver: ''
  });

  const [stops, setStops] = useState([]);

  const handleChange = (e) => {
    setRoute({ ...route, [e.target.name]: e.target.value });
  };

  const handleStopChange = (index, field, value) => {
    const updatedStops = [...stops];
    if (field === 'name') {
      updatedStops[index].name = value;
    } else if (field === 'lat') {
      updatedStops[index].coordinates.lat = parseFloat(value);
    } else if (field === 'lng') {
      updatedStops[index].coordinates.lng = parseFloat(value);
    }
    setStops(updatedStops);
  };

  const addStop = () => {
    setStops([...stops, { name: '', coordinates: { lat: 0, lng: 0 } }]);
  };

  const removeStop = (index) => {
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    setStops(updatedStops);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...route,
      stops,
    };

    axios.post('http://localhost:5000/api/routes', dataToSend)
      .then(() => navigate('/routes'))
      .catch(err => console.error(err));
  };

  return (
    <div className="add-route-container">
      <h2 className="form-title"> Add New Route</h2>
      <form className="add-route-form" onSubmit={handleSubmit}>
        <input type="text" name="routeName" onChange={handleChange} placeholder="Route Name" required />
        <input type="text" name="startPoint" onChange={handleChange} placeholder="Start Point" required />
        <input type="text" name="endPoint" onChange={handleChange} placeholder="End Point" required />
        <input type="text" name="driver" onChange={handleChange} placeholder="Driver Name" />

        <h4 className="stops-title"> Route Stops</h4>
        {stops.map((stop, index) => (
          <div key={index} className="s top-group">
            <input
              type="text"
              placeholder="Stop Name"
              value={stop.name}
              onChange={(e) => handleStopChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Latitude"
              value={stop.coordinates.lat}
              onChange={(e) => handleStopChange(index, 'lat', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Longitude"
              value={stop.coordinates.lng}
              onChange={(e) => handleStopChange(index, 'lng', e.target.value)}
              required
            />
            <button type="button" className="remove-btn" onClick={() => removeStop(index)}>Remove</button>
          </div>
        ))}

        <button type="button" className="add-stop-btn" onClick={addStop}>+ Add Stop</button>

        <button type="submit" className="submit-btn">  Add Route</button>
      </form>
    </div>
  );
};

export default AddRoute;
