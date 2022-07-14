const loginService = require('../services/loginService');

const login = async (req, res) => {
  loginService.validateBody(req.body);
  const token = loginService.validateUserCredentials(req.body);
  res.status(200).json({ token });
};

module.exports = {
  login,
};