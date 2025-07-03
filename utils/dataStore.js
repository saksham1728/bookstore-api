const fs = require('fs').promises;
const path = require('path');

function filePath(filename) {
  return path.join(__dirname, '..', filename);
}

async function readData(filename) {
  try {
    const json = await fs.readFile(filePath(filename), 'utf-8');
    return JSON.parse(json);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeData(filename, data) {
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath(filename), json, 'utf-8');
}

module.exports = {
  getUsers:  () => readData('users.json'),
  saveUsers: users => writeData('users.json', users),
  getBooks:  () => readData('books.json'),
  saveBooks: books => writeData('books.json', books),
};