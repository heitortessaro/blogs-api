require('dotenv').config();
const Joi = require('joi');
const createError = require('../helpers/createError');
const { Category } = require('../database/models/index');

const validateBody = async (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error } = await schema.validateAsync(body);
  if (error) throw error;
};

const validateId = async ({ categoryIds }) => {
  const result = await Category.findAll({ attributes: ['id'] });
  const existingCategoriesIds = result.map((category) => category.id);
  const allExist = categoryIds.every((id) => existingCategoriesIds.includes(id));
  console.log(allExist);
  if (!allExist) createError(400, '"categoryIds" not found');
};

const addCategory = async ({ name }) => {
  const result = await Category.create({ name });
  if (result) {
    return result;
  }
  createError(500, 'Problems adding user to the DB');
};

const getAllCategories = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  getAllCategories,
  validateBody,
  addCategory,
  validateId,
};