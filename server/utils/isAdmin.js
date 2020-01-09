const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(401).send({ error: 'Only for admin.' });
  return next();
};

module.exports = isAdmin;
