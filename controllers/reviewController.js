const asyncHandler = require("../utils/asyncHandler");
const Review = require("../models/Review");

// @desc    Submit a new review
// @route   POST /api/reviews
// @access  Public
const createReview = asyncHandler(async (req, res) => {
  const { name, rating, text } = req.body;
  const review = await Review.create({ name, rating, text });
  res.status(201).json({ message: "Thank you for your review!", review });
});

// @desc    Get approved reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
  res.json(reviews);
});

module.exports = { createReview, getReviews };
