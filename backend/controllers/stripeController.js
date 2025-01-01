const stripe = require("../utils/stripe");
const Payment = require("../models/paymentModel");

// Create a Payment Intent
exports.createPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Create a Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to smallest currency unit (cents)
      currency: currency || "usd",
      payment_method_types: ["card"], // Accept only card payments
    });

    // Save payment record in the database
    const payment = new Payment({
      amount,
      currency,
      stripePaymentId: paymentIntent.id,
      paymentStatus: "pending",
    });
    await payment.save();

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    console.log("errtyuioyertyui;oiuytrrtyu", error);
    console.log("erorrrrrrrmsg", error.message);

    res.status(500).json({ success: false, error: error.message });
  }
};

// Verify a Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment)
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });

    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment.stripePaymentId
    );

    payment.paymentStatus = paymentIntent.status; // Update the payment status
    await payment.save();

    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
