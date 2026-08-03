const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Admin login (credentials come from .env, not the database)
// @route   POST /api/admin/login
// @access  Public
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const validEmail = email.trim().toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase();
  const validPassword = password === process.env.ADMIN_PASSWORD;

  if (!validEmail || !validPassword) {
    res.status(401);
    throw new Error("Invalid admin credentials");
  }

  const token = jwt.sign(
    { email: process.env.ADMIN_EMAIL, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  res.json({
    message: "Login successful",
    token,
    admin: { email: process.env.ADMIN_EMAIL },
  });
});

// @desc    Verify the current admin token is still valid (used on app load)
// @route   GET /api/admin/me
// @access  Private
const getAdminProfile = asyncHandler(async (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = { adminLogin, getAdminProfile };
