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

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUser({ id });
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  await userService.deleteUser({ id });
  return res.status(204).json();
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  deleteUser,
};
