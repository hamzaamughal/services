require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

// Routes
const userRoutes = require("./routes/userRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const authRoutes = require("./routes/authRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const translationRoutes = require("./routes/translationRoutes");
const blogRoutes = require("./routes/blogRoutes");
const pressReleaseRoutes = require("./routes/pressReleaseRoutes");
const emailRoutes = require("./routes/emailRoutes");
const contactRoutes = require("./routes/contactRoutes");
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Hello from MPRIVE backend Updated🎖️" });
});

app.use("/api", translationRoutes);
// Routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/stripe", stripeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/press-releases", pressReleaseRoutes);
app.use("/api", serviceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/contact", contactRoutes);
// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}🚀🚀`));
