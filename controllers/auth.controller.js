const jwt = require('jsonwebtoken');
const { jwtSecret, tokenExpiry } = require('../config');
const UserModel = require('../models/user.model');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email & password required' });
    if (await UserModel.findByEmail(email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const newUser = await UserModel.create({ email, password });
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.validate(email, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
};