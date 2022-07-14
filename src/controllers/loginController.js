const loginService = require('../services/loginService');

const login = async (req, res) => {
  await loginService.validateBody(req.body);
  const token = await loginService.validateUserCredentials(req.body);
  res.status(200).json({ token });
};

module.exports = {
  login,
};
