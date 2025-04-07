import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const AdminTracker = () => {
  const socketRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000");
    }

    const socket = socketRef.current;

    if (!mapRef.current) {
      mapRef.current = L.map("admin-map").setView([17.385044, 78.486671], 12); // Centered Hyderabad
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
    }

    socket.on("busLocationUpdated", (data) => {
      const { busId, latitude, longitude } = data;

      if (!latitude || !longitude || !busId) return;

      if (!markersRef.current[busId]) {
        markersRef.current[busId] = L.marker([latitude, longitude])
          .addTo(mapRef.current)
          .bindPopup(`Bus:  ${busId}`);
      } else {
        markersRef.current[busId].setLatLng([latitude, longitude]);
      }
    });

    return () => {
      socket.off("busLocationUpdated");
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h2 style={{ padding: "10px" }}>🎓 Admin Bus Tracker</h2>
      <div id="admin-map" style={{ height: "90%", width: "100%" }}></div>
    </div>
  );
};

export default AdminTracker;
