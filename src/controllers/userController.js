const userService = require('../services/userService');

const addUser = async (req, res) => {
  await userService.validateBody(req.body);
  const { email } = req.body;
  // console.log(email);
  await userService.validateNewEmail({ email });
  const token = await userService.addNewUser(req.body);
  res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

module.exports = {
  addUser,
  getAllUsers,
};
