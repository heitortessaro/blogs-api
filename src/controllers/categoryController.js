const categoryService = require('../services/categoryService');

const getAllCategories = async (_req, res) => {
  const categories = await categoryService.getAllCategories();
  return res.status(200).json(categories);
};

const addCategory = async (req, res) => {
  await categoryService.validateBody(req.body);
  const { name } = req.body;
  const result = await categoryService.addCategory({ name });
  return res.status(201).json(result);
};

module.exports = {
  getAllCategories,
  addCategory,
};
