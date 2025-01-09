const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
 title: {
  type: String,
  required: true,
 },
 description: {
  type: String,
  required: true,
 },
 image: {
  type: String, // Assuming image is a file path or URL to an image
  required: true,
 },
 createdAt: {
  type: Date,
  default: Date.now,
 },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);