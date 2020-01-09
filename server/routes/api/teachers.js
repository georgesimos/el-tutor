const router = require('express').Router();
const auth = require('../../config/auth');
const Teacher = require('../../models/Teacher');

/* Get all teachers */
router.get('/', auth, async (req, res) => {
  try {
    const teachers = await Teacher.find({}).populate('_user', ['name', 'email']);
    res.send(teachers);
  } catch (e) {
    res.status(400).send(e);
  }
});

/* Get teacher by id */
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    return !teacher ? res.sendStatus(404) : res.send(teacher);
  } catch (e) {
    return res.sendStatus(400);
  }
});
module.exports = router;
