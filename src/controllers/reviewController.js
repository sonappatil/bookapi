const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
   const { bookId, rating, comment } = req.body;
   try { 
      const existing = await Review.findOne({ bookId, userId: req.user._id });
      if (existing) {
         return res.status(400).json({ message: 'You have already reviewed this book' });
      }

      const review = new Review({
         bookId,
         userId: req.user._id, // Use the authenticated user's ID
         rating,
         comment
      });
        await review.save();
        res.status(201).json(review);
   }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
   }    
};


exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only update your own reviews' });
        }

        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;
        await review.save();
        res.json(review);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own reviews' });
        }

        await review.deleteOne();
        res.json({ message: 'Review deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};