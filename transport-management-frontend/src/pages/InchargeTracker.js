import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const InchargeTracker = () => {
  const [busId, setBusId] = useState('');
  const [location, setLocation] = useState({ latitude: 17.385044, longitude: 78.486671 });

  useEffect(() => {
    const socket = io('http://localhost:5000');

    const geoId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        if (busId) {
          socket.emit('busLocationUpdate', {
            busId,
            latitude,
            longitude,
          });
        }
      },
      (err) => console.error(' Geolocation error:', err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );

    return () => {
      navigator.geolocation.clearWatch(geoId);
      socket.disconnect();
    };
  }, [busId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2> Bus Incharge Live Tracker</h2>

      <label>
        Bus ID:
        <input
          type="text"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          placeholder="Enter assigned Bus ID"
          style={{ marginLeft: '10px' }}
        />
      </label>

      <div style={{ marginTop: '15px' }}>
        <strong>Current Location:</strong>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p>
      </div>

      {busId && (
        <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup> Your Bus</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      <p style={{ marginTop: '15px' }}> Tracking auto-sends every few seconds...</p>
    </div>
  );
};

export default InchargeTracker;
