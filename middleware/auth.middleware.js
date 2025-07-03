// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });
  jwt.verify(token, jwtSecret, (err, payload) => {
    if (err) return res.status(403).json({ error: 'Token invalid' });
    req.user = { id: payload.userId, email: payload.email };
    next();
  });
};