const isStudent = (req, res, next) => {
  if (req.user.role === 'teacher') return res.status(401).send({ error: 'forbidden' });
  return next();
};

module.exports = isStudent;
