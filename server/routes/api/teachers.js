const router = require('express').Router();
const auth = require('../../config/auth');
const Teacher = require('../../models/Teacher');

/* Get all teachers */
router.get('/', auth, async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.send(teachers);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
