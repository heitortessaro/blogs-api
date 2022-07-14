require('dotenv').config();
const Joi = require('joi');
const createError = require('../helpers/createError');
const jwtService = require('./jwtService');
const { User } = require('../database/models/index');

const validateBody = async (body) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.any(),
  });
  const { error } = await schema.validateAsync(body);
  if (error) throw error;
};

const validateNewEmail = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    createError(409, 'User already registered');
  }
};

const addNewUser = async ({ displayName, email, password, image }) => {
  const result = await User.create({ displayName, email, password, image });
  if (result) {
    const token = jwtService.createToken({ email });
    return token;
  } 
  createError(500, 'Problems adding user to the DB');
};

const getAllUsers = async () => {
  const result = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return result;
};

const getUser = async ({ id }) => {
  const result = await User.findOne({
    attributes: ['id', 'displayName', 'email', 'image'],
    where: { id },
    });
  if (!result) {
    createError(404, 'User does not exist');
  }
  return result;
};

module.exports = {
  validateBody,
  validateNewEmail,
  addNewUser,
  getAllUsers,
  getUser,
};