const asyncHandler = require("../utils/asyncHandler");
const ContactMessage = require("../models/ContactMessage");

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;
  const contactMessage = await ContactMessage.create({ name, email, phone, message });
  res.status(201).json({ message: "Message sent successfully", contactMessage });
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
const getContactMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = { createContactMessage, getContactMessages };
