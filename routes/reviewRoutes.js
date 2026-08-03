const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { createReview, getReviews } = require("../controllers/reviewController");

const router = express.Router();

router.get("/", getReviews);
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("text").trim().notEmpty().withMessage("Review text is required"),
  ],
  validate,
  createReview
);

module.exports = router;
