require('dotenv/config');
const jwt = require('jsonwebtoken');
const createError = require('../helpers/createError');

const createToken = ({ email }) => {
    const { JWT_SECRET } = process.env;
    const payload = { email };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '20m',
      algorithm: 'HS256',
    });
    return token;
};

const validateToken = (token) => {
    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      return email;
    } catch (_erro) {
      createError(400, 'Token inválido');
    }
};

module.exports = {
  createToken, 
  validateToken,
};