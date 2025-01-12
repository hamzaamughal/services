// models/pressRelease.js
const mongoose = require("mongoose");

const pressReleaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: { type: String, required: false }, // Field to store image URL
  },
  {
    timestamps: true,
  }
);

const PressRelease = mongoose.model("PressRelease", pressReleaseSchema);

module.exports = PressRelease;
