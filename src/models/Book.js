  const mongoose = require('mongoose');
  const auth = require('../middlewares/authMiddleware');

  // Book model for MongoDB using Mongoose    
  const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
  author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });
  const Book = mongoose.model('Book', bookSchema);    
  // Middleware to check if the user is authenticated before creating a book  
  bookSchema.pre('save', async function(next) {
    if (!this.createdBy) {
      return next(new Error('CreatedBy field is required'));
    }
    next();
  });     
  // Export the Book model
  module.exports = Book;    