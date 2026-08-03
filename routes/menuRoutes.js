const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

router.get("/", getMenuItems);
router.post("/", adminAuth, createMenuItem);
router.put("/:id", adminAuth, updateMenuItem);
router.delete("/:id", adminAuth, deleteMenuItem);

module.exports = router;
