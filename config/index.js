require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  tokenExpiry: process.env.TOKEN_EXPIRY || '1h',
};