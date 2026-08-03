const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const adminAuth = require("../middleware/adminAuth");
const { adminLogin, getAdminProfile } = require("../controllers/adminController");

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("A valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  adminLogin
);

router.get("/me", adminAuth, getAdminProfile);

module.exports = router;
