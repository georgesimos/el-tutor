/**
 * haveAdmin middleware
 */
const User = require('../models/User');

const haveAdmin = async (req, res, next) => {
  try {
    const superadmin = await User.findOne({
      role: 'admin',
    });
    if (!superadmin) return next();
    throw new Error();
  } catch (e) {
    return res.status(403).send({ error: 'You can have only one admin.' });
  }
};

module.exports = haveAdmin;
