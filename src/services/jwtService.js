require('dotenv/config');
const jwt = require('jsonwebtoken');
const createError = require('../helpers/createError');

const createToken = ({ email, id }) => {
    const { JWT_SECRET } = process.env;
    const payload = { email, id };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '20m',
      algorithm: 'HS256',
    });
    return token;
};

const validateToken = (token) => {
    try {
      const { email, id } = jwt.verify(token, process.env.JWT_SECRET);
      return { email, id };
    } catch (_erro) {
      createError(401, 'Expired or invalid token');
    }
};

module.exports = {
  createToken, 
  validateToken,
};