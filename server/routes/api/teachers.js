const router = require('express').Router();
const auth = require('../../config/auth');
const isAdmin = require('../../utils/isAdmin');
const isTeacher = require('../../utils/isTeacher');
const Teacher = require('../../models/Teacher');

// @route    Get api/teachers
// @desc     Get all teachers
// @access   Admin
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const teachers = await Teacher.find({}).populate('_user', ['name', 'email']);
    res.send(teachers);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @route    Get api/teachers/me
// @desc     Get teacher profile
// @access   Teacher
router.get('/me', auth, isTeacher, async (req, res) => {
  const { _teacher, role } = req.user;
  if (role !== 'teacher')
    res.status(401).send({ message: 'forbidden, this endpoint is only for teachers' });
  try {
    const teacher = await await Teacher.findById(_teacher)
      .populate('_user', ['name', 'email'])
      .populate({
        path: '_grades',
        populate: { path: '_lesson', populate: { path: '_teacher', populate: '_user' } }
      })
      .populate({ path: '_grades', populate: { path: '_student', populate: '_user' } })
      .populate({ path: '_lesson', populate: { path: '_teacher', populate: '_user' } })
      .populate({ path: '_lesson', populate: { path: '_students', populate: '_user' } });
    // .populate('_user', ['name', 'email']);

    return !teacher ? res.sendStatus(404) : res.send(teacher);
  } catch (e) {
    return res.sendStatus(400);
  }
});
module.exports = router;
