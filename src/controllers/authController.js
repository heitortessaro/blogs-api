const authService = require('../services/authService');

const validateToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  const { email, id } = authService.validateToken(authorization);
  req.user = { email, id };
  next();
};

module.exports = { validateToken };