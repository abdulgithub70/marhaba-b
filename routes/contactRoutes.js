const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const adminAuth = require("../middleware/adminAuth");
const { createContactMessage, getContactMessages } = require("../controllers/contactController");

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  validate,
  createContactMessage
);

router.get("/", adminAuth, getContactMessages);

module.exports = router;
