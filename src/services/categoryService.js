require('dotenv').config();
// const Joi = require('joi');
// const createError = require('../helpers/createError');
// const jwtService = require('./jwtService');
const { Category } = require('../database/models/index');

const getAllCategories = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  getAllCategories,
};