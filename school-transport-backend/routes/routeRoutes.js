const express = require('express');
const router = express.Router();
const {
  createRoute,
  getAllRoutes,
  getRouteById,      // ✅ add this
  updateRoute,
  deleteRoute
} = require('../controllers/routeController');

router.post('/routes', createRoute);
router.get('/routes', getAllRoutes);
router.get('/routes/:id', getRouteById);
router.put('/routes/:id', updateRoute);
router.delete('/routes/:id', deleteRoute);

module.exports = router;
