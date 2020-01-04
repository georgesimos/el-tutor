const router = require('express').Router();
const auth = require('../config/auth');
const Lesson = require('../models/Lesson');

/* Create a Lesson */
router.post('/lessons', async (req, res) => {
  const { title, description } = req.body;
  const lesson = new Lesson({ title, description });
  try {
    await lesson.save();
    res.status(201).send({ lesson });
  } catch (e) {
    res.status(400).send(e);
  }
});

/* Get all lessons */
router.get('/lessons', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    res.send(lessons);
  } catch (e) {
    res.status(400).send(e);
  }
});

/* Update lesson by id */
router.patch('/lessons/:id', auth, async (req, res) => {
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
router.delete('/lessons/:id', auth, async (req, res) => {
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
