require('dotenv/config');
const jwtService = require('./jwtService');
const createError = require('../helpers/createError');

const validateToken = (token) => {
  if (!token) {
    createError(401, 'Token not found');
  }
  const user = jwtService.validateToken(token); 
  return user;
};

module.exports = { validateToken };