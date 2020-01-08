const router = require('express').Router();
const auth = require('../../config/auth');
const Grade = require('../../models/Grade');

/* Get all grades */
router.get('/', auth, async (req, res) => {
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

/* Create a grade */
router.post('/', auth, async (req, res) => {
  const { grade, studentId: _student, lessonId: _lesson } = req.body;
  const newGrade = new Grade({ grade, _student, _lesson });
  try {
    await newGrade.save();
    res.send(newGrade);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
