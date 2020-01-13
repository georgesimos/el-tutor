const router = require('express').Router();
const auth = require('../../config/auth');
const isAdmin = require('../../utils/isAdmin');
const Lesson = require('../../models/Lesson');
const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');

// @route    Post api/lessons
// @desc     Create a lesson
// @access   Admin
router.post('/', auth, isAdmin, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(401).send({
      message: 'Only Admin can create a lesson'
    });
  const { title, description, _teacher, _students } = req.body;
  const lesson = new Lesson({
    title,
    description,
    _teacher
  });
  lesson._students = [...lesson._students, ..._students];

  try {
    // Find teacher and save the lesson
    const teacher = await Teacher.findById(_teacher);
    if (!teacher) return res.status(404).send({ message: 'Teacher not found' });
    if (teacher.lesson)
      return res.status(404).send({
        message: 'Teacher have already a lesson'
      });
    teacher.lesson = lesson._id;
    await teacher.save();
    // For each student...
    // eslint-disable-next-line consistent-return
    _students.forEach(async id => {
      const student = await Student.findById(id);
      if (!student) return res.status(404).send({ message: 'Student not found' });
      // throw new ErrorResponse('Teacher not found', 401);
      if (!student.lessons.includes(lesson._id)) {
        student.lessons.push(lesson._id);
        await student.save();
      }
    });
    await lesson.save();
    return res.status(201).send({ lesson });
  } catch (e) {
    return res.status(400).send(e);
  }
});

// @route    Get api/lessons
// @desc     Get all lessons
// @access   Admin
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const lessons = await Lesson.find({})
      .populate({ path: '_teacher', populate: { path: '_user', select: ['name', 'email'] } })
      .populate({ path: '_students', populate: { path: '_user', select: ['name', 'email'] } });

    res.send(lessons);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @route    Get api/lessons/:id
// @desc     Get a lesson by id
// @access   All
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const lessons = await Lesson.findById(id)
      .populate({ path: '_teacher', populate: { path: '_user', select: ['name', 'email'] } })
      .populate({ path: '_students', populate: { path: '_user', select: ['name', 'email'] } });

    return !lessons ? res.sendStatus(404) : res.send(lessons);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// @route    Patch api/lessons/:id
// @desc     Update a lesson by id
// @access   Admin
router.patch('/:id', auth, isAdmin, async (req, res) => {
  const validationErrors = [];
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description'];
  const isValidOperation = updates.every(update => {
    const isValid = allowedUpdates.includes(update);
    if (!isValid) validationErrors.push(update);
    return isValid;
  });

  if (!isValidOperation)
    return res.status(400).send({ message: `Invalid updates: ${validationErrors.join(',')}` });

  try {
    const _id = req.params.id;
    const lesson = await Lesson.findById(_id);
    if (!lesson) return res.sendStatus(404);
    // eslint-disable-next-line no-return-assign
    updates.forEach(update => (lesson[update] = req.body[update]));
    await lesson.save();

    return res.send(lesson);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// @route    Delete api/lessons/:id
// @desc     Delete a lesson by id
// @access   Admin
router.delete('/:id', auth, isAdmin, async (req, res) => {
  const _id = req.params.id;
  try {
    const lesson = await Lesson.findByIdAndDelete(_id);
    if (!lesson) return res.sendStatus(404);

    return res.send({ message: 'Lesson Deleted' });
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;
