/**
 * Auth middleware
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  let token;
  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.replace('Bearer ', '');
  }
  if (!token) return res.status(401).send({ message: 'Please authenticate.' });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    return next();
  } catch (e) {
    return res.status(401).send({ message: 'Please authenticate.' });
  }
};

module.exports = auth;
