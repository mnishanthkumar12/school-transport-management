const Bus = require('../models/Bus');
exports.createBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const savedBus = await bus.save();
    res.status(201).json(savedBus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('routeId');
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('routeId');
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.status(200).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.status(200).json(updatedBus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
