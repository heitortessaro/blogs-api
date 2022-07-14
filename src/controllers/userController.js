const userService = require('../services/userService');

const addUser = async (req, res) => {
  await userService.validateBody(req.body);
  const { email } = req.body;
  await userService.validateNewEmail(email);
  const token = await userService.addNewUser(req.body);
  res.status(209).json({ token });
};

module.exports = {
  addUser,
};
