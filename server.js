const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

dotenv.config();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const reservationRoutes = require("./routes/reservationRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const menuRoutes = require("./routes/menuRoutes");
const contactRoutes = require("./routes/contactRoutes");
const orderRoutes = require("./routes/orderRoutes");
const tableRoutes = require("./routes/tableRoutes");
const adminRoutes = require("./routes/adminRoutes");

connectDB();

const app = express();

// Security & core middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Basic rate limiting on write-heavy public endpoints
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/", limiter);

//start
app.get("/", (req, res) => res.json({ status: "ok" }));
// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/admin", adminRoutes);

// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Marhaba backend running on port ${PORT}`));
