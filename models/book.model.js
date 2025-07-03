// models/book.model.js
// Handles Book data manipulation
const { v4: uuidv4 } = require('uuid');
const dataStore = require('../utils/dataStore');

class BookModel {
  static async findAll() {
    return await dataStore.getBooks();
  }

  static async findById(id) {
    const books = await dataStore.getBooks();
    return books.find(b => b.id === id) || null;
  }

  static async create({ title, author, genre, publishedYear, userId }) {
    const books = await dataStore.getBooks();
    const newBook = { id: uuidv4(), title, author, genre, publishedYear, userId };
    books.push(newBook);
    await dataStore.saveBooks(books);
    return newBook;
  }

  static async update(id, updates, userId) {
    const books = await dataStore.getBooks();
    const idx = books.findIndex(b => b.id === id && b.userId === userId);
    if (idx === -1) return null;
    books[idx] = { ...books[idx], ...updates };
    await dataStore.saveBooks(books);
    return books[idx];
  }

  static async delete(id, userId) {
    let books = await dataStore.getBooks();
    const initialLen = books.length;
    books = books.filter(b => !(b.id === id && b.userId === userId));
    if (books.length === initialLen) return false;
    await dataStore.saveBooks(books);
    return true;
  }
}

module.exports = BookModel;