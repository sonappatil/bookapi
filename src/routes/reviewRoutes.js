const express = require('express');
const router = express.Router();    
const reviewController = require('../controllers/reviewController');
const auth = require('../middlewares/authMiddleware');

// Create a new review      
router.post('/books/:id/reviews', auth, reviewController.createReview);
// Update a review by ID
router.put('/reviews/:id', auth, reviewController.updateReview);
// Delete a review by ID
router.delete('/reviews/:id', auth, reviewController.deleteReview);


module.exports = router;
