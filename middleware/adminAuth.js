const jwt = require("jsonwebtoken");

// Protects admin-only routes. Expects: Authorization: Bearer <token>
const adminAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized, no token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      res.status(403);
      return next(new Error("Not authorized as admin"));
    }
    req.admin = { email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    res.status(401);
    next(new Error("Not authorized, invalid or expired token"));
  }
};

module.exports = adminAuth;
