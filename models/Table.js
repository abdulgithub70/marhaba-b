const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, trim: true, unique: true },
    capacity: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["available", "reserved", "occupied"],
      default: "available",
    },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);
