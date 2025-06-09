const Book = require('../models/Book');
const auth = require('../middlewares/authMiddleware');
const Review = require('../models/Review'); // Assuming you have a Review model

exports.createBook = async (req, res) => {
    const { title, author, description, genre } = req.body;
    try {
        const book = new Book({
            title,
            author,
            description,
            genre,
            createdBy: req.user._id // Use the authenticated user's ID
        });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}   


exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = genre;

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(books);
};

exports.getBookById = async (req, res) => {
 
    try {
        const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const reviews = await Review.find({ book: book._id });
  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  res.json({ book, avgRating, reviews });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.searchBooks = async (req, res) => {
    const { query } = req.query;
    try {
        const books = await Book.find({
            $or: [
                { title: new RegExp(query, 'i') },  
                { author: new RegExp(query, 'i') },
            ],
        })  // Limit to 10 results
        res.json(books);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

