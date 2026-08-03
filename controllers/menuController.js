const asyncHandler = require("../utils/asyncHandler");
const MenuItem = require("../models/MenuItem");

// @desc    Get all menu items (optionally filter by category)
// @route   GET /api/menu?category=Biryani
// @access  Public
const getMenuItems = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.includeUnavailable !== "true") filter.isAvailable = true;
  if (req.query.category) filter.category = req.query.category;
  const items = await MenuItem.find(filter).sort({ isPopular: -1, name: 1 });
  res.json(items);
});

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private
const createMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
});

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private
const updateMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) {
    res.status(404);
    throw new Error("Menu item not found");
  }
  res.json(item);
});

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private
const deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Menu item not found");
  }
  res.json({ message: "Menu item deleted" });
});

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };
