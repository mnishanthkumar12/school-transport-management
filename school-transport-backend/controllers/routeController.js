const Route = require('../models/Route');

exports.createRoute = async (req, res) => {
  try {
    const route = new Route(req.body);
    const savedRoute = await route.save();
    res.status(201).json(savedRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedRoute) return res.status(404).json({ error: 'Route not found' });
    res.status(200).json(updatedRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.status(200).json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteRoute = async (req, res) => {
  try {
    const deleted = await Route.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Route not found' });
    res.status(200).json({ message: 'Route deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
