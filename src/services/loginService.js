require('dotenv').config();
const Joi = require('joi');
const createError = require('../helpers/createError');
const jwtService = require('./jwtService');
const { User } = require('../database/models/index');

const validateBody = async (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Some required fields are missing',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Some required fields are missing',
    }),
  });
  const { error } = await schema.validateAsync(body);
  if (error) throw error;
};

const validateUserCredentials = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  // throw 'error';
  if (!user || user.password !== password) {
    createError(400, 'Invalid fields');
  }
  const token = jwtService.createToken({ email });
  return token;
};

module.exports = {
  validateBody,
  validateUserCredentials,
};
