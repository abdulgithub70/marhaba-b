const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isVeg: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
