// controllers/books.controller.js
const BookModel = require('../models/book.model');

exports.getAll = async (req, res, next) => {
    try {
      // Extract filter & pagination params
      const { genre, page = 1, limit = 10 } = req.query;
      const allBooks = await BookModel.findAll();
  
      // 1. Filter by genre (if provided)
      const filtered = genre
        ? allBooks.filter(b =>
            b.genre.toLowerCase() === genre.toLowerCase()
          )
        : allBooks;
  
      // 2. Pagination calculations
      const pageNum = Math.max(1, parseInt(page, 10));
      const limNum  = Math.max(1, parseInt(limit, 10));
      const start  = (pageNum - 1) * limNum;
      const end    = start + limNum;
      const paged  = filtered.slice(start, end);
  
      // 3. Build response metadata
      const totalCount = filtered.length;
      const totalPages = Math.ceil(totalCount / limNum);
  
      res.json({
        data: paged,
        meta: {
          totalCount,
          totalPages,
          page: pageNum,
          limit: limNum
        }
      });
    } catch (err) {
      next(err);
    }
  };

exports.getById = async (req, res, next) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    const userId = req.user.id;
    const newBook = await BookModel.create({ title, author, genre, publishedYear, userId });
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updates = req.body;
    const userId = req.user.id;
    const book = await BookModel.update(req.params.id, updates, userId);
    if (!book) return res.status(404).json({ error: 'Book not found or unauthorized' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const deleted = await BookModel.delete(req.params.id, userId);
    if (!deleted) return res.status(404).json({ error: 'Book not found or unauthorized' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};