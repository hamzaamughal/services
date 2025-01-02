const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "usd",
  },
  paymentStatus: {
    type: String,
    required: true,
    default: "pending",
  },
  stripePaymentId: {
    type: String,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
