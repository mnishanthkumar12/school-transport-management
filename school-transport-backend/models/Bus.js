const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  numberPlate: { type: String, required: true },
  capacity: { type: Number, required: true },
  driverName: { type: String, required: true },
  driverContact: { type: String, required: true },
  driverLicense: { type: String, required: true },
  cleanerName: { type: String },
  cleanerContact: { type: String },
  inchargeName: { type: String, required: true },
  inchargeContact: { type: String, required: true },
  inchargeEmail: { type: String },
  currentLocation: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
