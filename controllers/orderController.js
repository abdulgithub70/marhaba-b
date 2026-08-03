const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// @desc    Place a new order (delivery or dine-in)
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderType,
    customerName,
    customerPhone,
    customerEmail,
    items,
    address,
    city,
    pincode,
    tableNumber,
    guests,
    notes,
  } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Order must include at least one item");
  }

  if (orderType === "delivery" && (!address || !city)) {
    res.status(400);
    throw new Error("Delivery orders require an address and city");
  }

  if (orderType === "dine-in" && !tableNumber) {
    res.status(400);
    throw new Error("Dine-in orders require a table number");
  }

  // Re-price items from the database so a tampered client can't set arbitrary prices
  const menuItemIds = items.map((i) => i.menuItem).filter(Boolean);
  const dbItems = await MenuItem.find({ _id: { $in: menuItemIds } });
  const priceMap = new Map(dbItems.map((m) => [m._id.toString(), m]));

  const resolvedItems = items.map((i) => {
    const dbItem = priceMap.get(i.menuItem);
    if (!dbItem) {
      res.status(400);
      throw new Error(`Menu item not found: ${i.name || i.menuItem}`);
    }
    const quantity = Number(i.quantity) || 1;
    return {
      menuItem: dbItem._id,
      name: dbItem.name,
      price: dbItem.price,
      quantity,
    };
  });

  const totalAmount = resolvedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = await Order.create({
    orderType,
    customerName,
    customerPhone,
    customerEmail,
    items: resolvedItems,
    totalAmount,
    address,
    city,
    pincode,
    tableNumber,
    guests,
    notes,
  });

  res.status(201).json({ message: "Order placed successfully", order });
});

// @desc    Get all orders (optionally filter by status or orderType)
// @route   GET /api/orders
// @access  Private (admin)
const getOrders = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.orderType) filter.orderType = req.query.orderType;
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get a single order
// @route   GET /api/orders/:id
// @access  Private (admin)
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(order);
});

// @desc    Update order status
// @route   PATCH /api/orders/:id
// @access  Private (admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  order.status = req.body.status || order.status;
  await order.save();
  res.json(order);
});

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
