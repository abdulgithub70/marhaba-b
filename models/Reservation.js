const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    guests: { type: Number, required: true, min: 1, max: 30 },
    date: { type: String, required: true },
    time: { type: String, required: true },
    request: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
