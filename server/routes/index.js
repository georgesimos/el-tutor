const router = require('express').Router();

router.use('/api/users', require('./api/users'));
router.use('/api/lessons', require('./api/lessons'));
router.use('/api/teachers', require('./api/teachers'));
router.use('/api/students', require('./api/students'));
router.use('/api/grades', require('./api/grades'));

module.exports = router;
