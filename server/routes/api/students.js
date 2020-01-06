const router = require('express').Router();
const auth = require('../../config/auth');
const Student = require('../../models/Student');

/* Get all students */
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find({}).populate('_user', ['name', 'email']);
    res.send(students);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
