const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(401).send({ error: 'forbidden' });
  return next();
};

module.exports = isAdmin;
