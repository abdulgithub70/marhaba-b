const asyncHandler = require("../utils/asyncHandler");
const Table = require("../models/Table");

// @desc    Get all tables
// @route   GET /api/tables
// @access  Public (customers can see availability; admin sees the same list)
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find().sort({ number: 1 });
  res.json(tables);
});

// @desc    Create a new table
// @route   POST /api/tables
// @access  Private (admin)
const createTable = asyncHandler(async (req, res) => {
  const { number, capacity, notes } = req.body;
  const exists = await Table.findOne({ number });
  if (exists) {
    res.status(400);
    throw new Error(`Table ${number} already exists`);
  }
  const table = await Table.create({ number, capacity, notes });
  res.status(201).json(table);
});

// @desc    Update a table (status, capacity, notes)
// @route   PUT /api/tables/:id
// @access  Private (admin)
const updateTable = asyncHandler(async (req, res) => {
  const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!table) {
    res.status(404);
    throw new Error("Table not found");
  }
  res.json(table);
});

// @desc    Delete a table
// @route   DELETE /api/tables/:id
// @access  Private (admin)
const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findByIdAndDelete(req.params.id);
  if (!table) {
    res.status(404);
    throw new Error("Table not found");
  }
  res.json({ message: "Table deleted" });
});

module.exports = { getTables, createTable, updateTable, deleteTable };
