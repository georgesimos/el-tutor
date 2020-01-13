const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(401).send({ message: 'forbidden' });
  return next();
};

module.exports = isAdmin;
