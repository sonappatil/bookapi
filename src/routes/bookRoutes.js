const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/authMiddleware');

// Create a new book
router.post('/postbook', auth, bookController.createBook);
// Get all books with optional filters
router.get('/', bookController.getBooks);
router.get('/search', bookController.searchBooks);
// Get a book by ID
router.get('/:id', bookController.getBookById);
// Search books by title or author


// // Update a book by ID
// router.put('/:id', authMiddleware, bookController.updateBook);
// // Delete a book by ID      
// router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;
