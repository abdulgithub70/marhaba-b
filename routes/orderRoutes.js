const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const adminAuth = require("../middleware/adminAuth");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post(
  "/",
  [
    body("orderType").isIn(["delivery", "dine-in"]).withMessage("orderType must be delivery or dine-in"),
    body("customerName").trim().notEmpty().withMessage("Name is required"),
    body("customerPhone").trim().notEmpty().withMessage("Phone number is required"),
    body("items").isArray({ min: 1 }).withMessage("At least one item is required"),
  ],
  validate,
  createOrder
);

router.get("/", adminAuth, getOrders);
router.get("/:id", adminAuth, getOrderById);
router.patch("/:id", adminAuth, updateOrderStatus);

module.exports = router;
