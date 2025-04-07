const express = require('express');
const router = express.Router();
const {
  createBus,
  getAllBuses,
  getBusById,       
  updateBus,
  deleteBus
} = require('../controllers/busController');


router.post('/buses', createBus);
router.get('/buses', getAllBuses);
router.get('/buses/:id', getBusById);
router.put('/buses/:id', updateBus);
router.delete('/buses/:id', deleteBus);

module.exports = router; 