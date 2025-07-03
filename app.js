const express = require('express');
const logger = require('./middleware/logger.middleware');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/books.routes');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server Error' });
});

module.exports = app;