const Review = require('../models/review');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Create a review
exports.create = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.profile._id;
    const userName = req.profile.name;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    });

    if (existingReview) {
      return res.status(400).json({
        error: 'You have already reviewed this product',
      });
    }

    const review = new Review({
      product: productId,
      user: userId,
      userName,
      rating,
      comment,
    });

    const savedReview = await review.save();
    res.json(savedReview);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

// Get reviews for a product
exports.getByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .sort({ createdAt: -1 })
      .select('userName rating comment createdAt')
      .exec();
    res.json(reviews);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

// Get all reviews (for sliding banner)
exports.list = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('userName rating comment createdAt')
      .exec();
    res.json(reviews);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

// Update a review
exports.update = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findOneAndUpdate(
      { _id: req.params.reviewId, user: req.profile._id },
      { rating, comment },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        error: 'Review not found or unauthorized',
      });
    }

    res.json(review);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

// Delete a review
exports.remove = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      user: req.profile._id,
    });

    if (!review) {
      return res.status(404).json({
        error: 'Review not found or unauthorized',
      });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};
