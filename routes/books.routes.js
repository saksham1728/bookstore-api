// routes/books.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const booksController = require('../controllers/books.controller');

// All /api/books/* require a token
router.use(authMiddleware);

router.get('/', booksController.getAll);
router.get('/:id', booksController.getById);
router.post('/', booksController.create);
router.put('/:id', booksController.update);
router.delete('/:id', booksController.remove);

module.exports = router;