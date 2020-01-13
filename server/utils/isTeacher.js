const isTeacher = (req, res, next) => {
  if (req.user.role === 'student') return res.status(401).send({ message: 'forbidden' });
  return next();
};

module.exports = isTeacher;
