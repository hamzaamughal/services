// const dotenv = require("dotenv");
// const express = require("express");
// const connectDB = require("./database/db");
// const authRoutes = require("./routes/authroute");
// dotenv.config();
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   console.log("hello world");
//   res.send("hello");
// });

// console.log(app.get);

// app.use(express.json());
// app.use("/api/auth", authroute);

// app.listen(PORT, () => {
//   console.log(`server is running on ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const authRoutes = require("./routes/authRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const translationRoutes = require("./routes/translationRoutes");

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
// const cors = require("cors");

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", translationRoutes);
// Routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/stripe", stripeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api", serviceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
