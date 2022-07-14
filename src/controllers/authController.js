const authService = require('../services/authService');

const validateToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  const email = authService.validateToken(authorization);
  req.email = email;
  next();
};

module.exports = { validateToken };