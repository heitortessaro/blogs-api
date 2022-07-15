require('dotenv').config();
const Joi = require('joi');
const createError = require('../helpers/createError');
const jwtService = require('./jwtService');
const { User } = require('../database/models/index');

const validateBody = async (body) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
  });
  const { error } = await schema.validateAsync(body);
  if (error) throw error;
};

const validateUserCredentials = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    createError(400, 'Invalid fields');
  }
  const { id } = user;
  const token = jwtService.createToken({ email, id });
  return token;
};

module.exports = {
  validateBody,
  validateUserCredentials,
};
