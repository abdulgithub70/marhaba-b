const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const adminAuth = require("../middleware/adminAuth");
const {
  createReservation,
  getReservations,
  updateReservationStatus,
} = require("../controllers/reservationController");

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("guests").isInt({ min: 1, max: 30 }).withMessage("Guests must be between 1 and 30"),
    body("date").notEmpty().withMessage("Date is required"),
    body("time").notEmpty().withMessage("Time is required"),
  ],
  validate,
  createReservation
);

router.get("/", adminAuth, getReservations);
router.patch("/:id", adminAuth, updateReservationStatus);

module.exports = router;
