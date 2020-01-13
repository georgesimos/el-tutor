const router = require('express').Router();
const auth = require('../../config/auth');
const isAdmin = require('../../utils/isAdmin');
const isTeacher = require('../../utils/isTeacher');
const isStudent = require('../../utils/isStudent');
const Grade = require('../../models/Grade');
const Lesson = require('../../models/Lesson');
const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');

/* Get all grades */
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const grades = await Grade.find({})
      .populate({
        path: '_student',
        populate: { path: '_user', select: ['name', 'email'] }
      })
      .populate({
        path: '_lesson',
        select: ['title', 'description', '_teacher'],
        populate: { path: '_teacher', populate: { path: '_user', select: ['name', 'email'] } }
      });
    res.send(grades);
  } catch (e) {
    res.status(400).send(e);
  }
});

/* Get grade by id */
router.get('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const grade = await Grade.findById(id);
    return !grade ? res.sendStatus(404) : res.send(grade);
  } catch (e) {
    return res.sendStatus(400);
  }
});

/* Get grade by student id */
router.get('/student/:id', auth, isStudent, async (req, res) => {
  try {
    const { id } = req.params;
    const grades = await Grade.find({ _student: id }).populate({
      path: '_lesson',
      select: ['title', 'description', '_teacher'],
      populate: { path: '_teacher', populate: { path: '_user', select: ['name', 'email'] } }
    });
    return !grades ? res.sendStatus(404) : res.send(grades);
  } catch (e) {
    return res.sendStatus(400);
  }
});

/* Get grade by teacher id */
router.get('/teacher/:id', auth, isTeacher, async (req, res) => {
  try {
    const { id } = req.params;
    const grades = await Grade.find({ _teacher: id }).populate({
      path: '_lesson',
      select: ['title', 'description', '_teacher'],
      populate: { path: '_teacher', populate: { path: '_user', select: ['name', 'email'] } }
    });
    return !grades ? res.sendStatus(404) : res.send(grades);
  } catch (e) {
    return res.sendStatus(400);
  }
});

/* Create a grade */
router.post('/', auth, isTeacher, async (req, res) => {
  const { grade, _student, _lesson } = req.body;
  const lesson = await Lesson.findById(_lesson); // find the specific lesson

  if (req.user.role !== 'admin') {
    if (JSON.stringify(lesson._teacher) !== JSON.stringify(req.user._teacher))
      return res.status(401).send({ message: 'This lesson is not yours...' });
  }
  const teacher = await Teacher.findById(lesson._teacher);
  const student = await Student.findById(_student);

  const newGrade = new Grade({ grade, _student, _lesson });
  teacher._grades.push(newGrade._id);
  student._grades.push(newGrade._id);

  try {
    await newGrade.save();
    await teacher.save();
    await student.save();
    return res.send(newGrade);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
