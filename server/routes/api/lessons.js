const router = require('express').Router();
const auth = require('../../config/auth');
const Lesson = require('../../models/Lesson');

/* Create a Lesson */
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'superadmin')
    return res.status(401).send({ message: 'Only Admin can create a lesson' });
  const { title, description, _teacher, _students } = req.body;
  const lesson = new Lesson({ title, description, _teacher });
  lesson._students = [...lesson._students, ..._students];
  try {
    await lesson.save();
    return res.status(201).send({ lesson });
  } catch (e) {
    return res.status(400).send(e);
  }
});

/* Get all lessons */
router.get('/', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find({})
      .populate({ path: '_teacher', populate: { path: '_user', select: ['name', 'email'] } })
      .populate({ path: '_students', populate: { path: '_user', select: ['name', 'email'] } });

    res.send(lessons);
  } catch (e) {
    res.status(400).send(e);
  }
});

/* Get lesson by id */
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

/* Update lesson by id */
router.patch('/:id', auth, async (req, res) => {
  const validationErrors = [];
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description'];
  const isValidOperation = updates.every(update => {
    const isValid = allowedUpdates.includes(update);
    if (!isValid) validationErrors.push(update);
    return isValid;
  });

  if (!isValidOperation)
    return res.status(400).send({ error: `Invalid updates: ${validationErrors.join(',')}` });

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

/* Delete lesson by id */
router.delete('/:id', auth, async (req, res) => {
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
