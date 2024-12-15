const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
    },
    subscriptionId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    paymentSignature: {
      type: String,
    },
    receipt: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isSusses: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// index the orderId field
orderSchema.index({ orderId: 1 });

const Order = model("Order", orderSchema);

module.exports = Order;