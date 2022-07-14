const userService = require('../services/userService');

const addUser = async (req, res) => {
  await userService.validateBody(req.body);
  const { email } = req.body;
  // console.log(email);
  await userService.validateNewEmail({ email });
  const token = await userService.addNewUser(req.body);
  res.status(201).json({ token });
};

module.exports = {
  addUser,
};
