const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderType: { type: String, enum: ["delivery", "dine-in"], required: true },
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    customerEmail: { type: String, trim: true, lowercase: true, default: "" },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    totalAmount: { type: Number, required: true, min: 0 },

    // delivery-only fields
    address: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    pincode: { type: String, trim: true, default: "" },

    // dine-in-only fields
    tableNumber: { type: String, trim: true, default: "" },
    guests: { type: Number, default: undefined },

    notes: { type: String, trim: true, default: "" },
    paymentMethod: { type: String, enum: ["cod"], default: "cod" },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out-for-delivery",
        "delivered",
        "served",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
