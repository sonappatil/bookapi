const mongoose = require('mongoose');

// Review model for MongoDB using Mongoose
const reviewSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
  },
}, { timestamps: true });


const Review = mongoose.model('Review', reviewSchema);
// Middleware to check if the user is authenticated before creating a review    
reviewSchema.pre('save', async function(next) {
  if (!this.bookId || !this.userId) {
    return next(new Error('bookId and userId fields are required'));
  }
  next();
});
// Export the Review model
module.exports = Review;
