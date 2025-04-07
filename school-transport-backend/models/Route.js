const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true
  },
  startPoint: {
    type: String,
    required: true
  },
  endPoint: {
    type: String,
    required: true
  },
  stops: [
    {
      name: {
        type: String,
        required: true
      },
      coordinates: {
        lat:Number,
        lng:Number,
      }
    }
  ],
  driver: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
