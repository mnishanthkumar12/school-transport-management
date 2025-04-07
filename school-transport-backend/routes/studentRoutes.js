const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');
const Student = require('../models/Student');
router.get('/students/user/:userId', async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId }).populate('busId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found for this user' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/students', createStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router;
