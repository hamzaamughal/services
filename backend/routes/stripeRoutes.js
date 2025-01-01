const express = require("express");
const {
  createPayment,
  verifyPayment,
} = require("../controllers/stripeController");
const router = express.Router();

// Route to create a payment
router.post("/create-payment", createPayment);

// Route to verify a payment
router.get("/verify-payment/:paymentId", verifyPayment);

module.exports = router;
