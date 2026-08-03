const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} = require("../controllers/tableController");

const router = express.Router();

router.get("/", getTables);
router.post("/", adminAuth, createTable);
router.put("/:id", adminAuth, updateTable);
router.delete("/:id", adminAuth, deleteTable);

module.exports = router;
