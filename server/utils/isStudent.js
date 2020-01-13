const isStudent = (req, res, next) => {
  if (req.user.role === 'teacher') return res.status(401).send({ message: 'forbidden' });
  return next();
};

module.exports = isStudent;
