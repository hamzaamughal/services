const Stripe = require("stripe");
console.log("Stripe Secret Key in Stripe Util:", process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Set your Stripe Secret Key in .env
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
