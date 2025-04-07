import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ParentTracker = () => {
  const { busId } = useParams();
  const socketRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!busId) return;

    Notification.requestPermission().then((permission) => {
      console.log("Notification permission:", permission);
    });

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000");
      window.testSocket = socketRef.current;
    }

    const socket = socketRef.current;
    socket.emit("joinBusRoom", busId);

  
    if (!mapRef.current) {
      mapRef.current = L.map("parent-map").setView([0, 0], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
    }

    
    socket.on("busLocationUpdated", (data) => {
      if (data.busId === busId && data.latitude && data.longitude) {
        const { latitude, longitude } = data;
        console.log("📡 Received location update:", data);

        if (!markerRef.current) {
          markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
        } else {
          markerRef.current.setLatLng([latitude, longitude]);
        }

        mapRef.current.setView([latitude, longitude], 15);
      }
    });

   
    socket.on("busApproachingStop", (data) => {
      
      console.log("📢 ALERT ocnn:", data.message);
      alert("Socket eveent triggereed");
      try {
        new Notification(" Direct Test", {
          body: "This is a notification test inside the event",
        });
      } catch (err) {
        console.error("Notification Error:", err);
      }

      if (Notification.permission === "granted") {
        try {
          const notification = new Notification("🚍 Bus Alert", {
            body: data.message || "Bus is near your stop!",
            icon: "https://cdn-icons-png.flaticon.com/512/254/254638.png",
          });
    
          notification.onclick = () => {
            console.log(" Notification clicked");
          };
        } catch (error) {
          console.error(" Notification error:", error);
        }
      } else {
        console.warn(" Notification not granted");
      }
    });

    
    return () => {
      socket.emit("leaveBusRoom", busId);
      socket.off("busLocationUpdated");
      socket.off("busApproachingStop");
    };
  }, [busId]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h2 style={{ padding: "10px" }}>📍 Parent Tracker</h2>
      <p style={{ paddingLeft: "10px" }}>Tracking Bus ID: {busId}</p>
      <div id="parent-map" style={{ height: "90%", width: "100%" }}></div>
    </div>
  );
};

export default ParentTracker;
