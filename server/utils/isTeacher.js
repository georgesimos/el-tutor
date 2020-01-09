const isTeacher = (req, res, next) => {
  if (req.user.role === 'student') return res.status(401).send({ error: 'forbidden' });
  return next();
};

module.exports = isTeacher;
