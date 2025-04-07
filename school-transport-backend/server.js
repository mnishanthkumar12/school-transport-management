
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const busRoutes = require('./routes/busRoutes');
const studentRoutes = require('./routes/studentRoutes');
const routeRoutes = require('./routes/routeRoutes');
const authRoutes = require('./routes/auth');

// 🔁 Models
const Student = require('./models/Student');
const Bus = require('./models/Bus');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/school_transport', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB Connected'))
.catch(err => console.error(' MongoDB Error:', err));

app.use('/api', busRoutes);
app.use('/api', studentRoutes);
app.use('/api', routeRoutes);
app.use('/api/auth', authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
io.on('connection', (socket) => {
  console.log('🔌 New socket connected:', socket.id);

  socket.on('busLocationUpdate', async ({ busId, latitude, longitude }) => {
    console.log('📡 Bus Location Update:', { busId, latitude, longitude });

    try {
      await Bus.findByIdAndUpdate(busId, {
        currentLocation: { latitude, longitude }
      });
      const students = await Student.find({ busId }).populate('routePreference');

      for (const student of students) {
        const stop = student.routePreference?.stops?.find(
          s => s.name === student.boardingPoint
        );

        if (!stop) continue;

        const stopLat = stop.coordinates.lat;
        const stopLng = stop.coordinates.lng;

        const distance = getDistanceFromLatLonInKm(latitude, longitude, stopLat, stopLng);
        console.log(` Checking distance to: ${stop.name} (${distance.toFixed(3)} km)`);

        if (distance <= 0.1) {
          console.log(` ALERT: Bus is near ${stop.name}!`);
          io.emit('busProximityAlert', {
            busId,
            studentId: student._id,
            stopName: stop.name,
            distance
          });
        }
      }

     
      io.emit('busLocationUpdated', { busId, latitude, longitude });

    } catch (err) {
      console.error(' Error in busLocationUpdate:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔌 Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
