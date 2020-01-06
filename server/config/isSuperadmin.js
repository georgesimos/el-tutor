/**
 * isSuperadmin middleware
 */
const User = require('../models/User');

const isSuperadmin = async (req, res, next) => {
  try {
    const superadmin = await User.findOne({
      role: 'superadmin',
    });
    if (!superadmin) return next();
    throw new Error();
  } catch (e) {
    return res.status(403).send({ error: 'You can have only one admin.' });
  }
};

module.exports = isSuperadmin;
