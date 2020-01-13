const router = require('express').Router();
const auth = require('../../config/auth');
const isAdmin = require('../../utils/isAdmin');
const isStudent = require('../../utils/isStudent');
const Student = require('../../models/Student');

/* Get all students */
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const students = await Student.find({}).populate('_user', ['name', 'email']);
    res.send(students);
  } catch (e) {
    res.status(400).send(e);
  }
});

/* Get student profile */
router.get('/me', auth, isStudent, async (req, res) => {
  console.log(req);
  console.log(req.user);
  const { _student, role } = req.user;
  if (role !== 'student')
    res.status(401).send({ error: 'forbidden, this endpoint is only for students' });
  try {
    const student = await await Student.findById(_student)
      .populate({
        path: '_grades',
        populate: { path: '_lesson', populate: { path: '_teacher', populate: '_user' } }
      })
      .populate({ path: '_grades', populate: { path: '_student', populate: '_user' } })
      .populate({ path: '_lessons', populate: { path: '_teacher', populate: '_user' } })
      .populate('_user', ['name', 'email']);

    return !student ? res.sendStatus(404) : res.send(student);
  } catch (e) {
    return res.sendStatus(400);
  }
});

/* Get student by id */
router.get('/:id', auth, isStudent, async (req, res) => {
  try {
    const { id } = req.params;
    const student = await await Student.findById(id)
      .populate({
        path: '_grades',
        populate: { path: '_lesson', populate: { path: '_teacher', populate: '_user' } }
      })
      .populate({ path: '_grades', populate: { path: '_student', populate: '_user' } })
      .populate({ path: '_lessons', populate: { path: '_teacher', populate: '_user' } })
      .populate('_user', ['name', 'email']);

    return !student ? res.sendStatus(404) : res.send(student);
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;
