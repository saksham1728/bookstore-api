// models/user.model.js
// Handles User data manipulation
const { v4: uuidv4 } = require('uuid');
const dataStore = require('../utils/dataStore');

class UserModel {
  static async create({ email, password }) {
    const users = await dataStore.getUsers();
    const newUser = { id: uuidv4(), email, password };
    users.push(newUser);
    await dataStore.saveUsers(users);
    return newUser;
  }

  static async findByEmail(email) {
    const users = await dataStore.getUsers();
    return users.find(u => u.email === email) || null;
  }

  static async validate(email, password) {
    const user = await this.findByEmail(email);
    if (user && user.password === password) return user;
    return null;
  }
}

module.exports = UserModel;