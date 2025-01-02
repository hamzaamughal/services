const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
  sourceText: {
    type: String,
    required: true,
  },
  targetLanguage: {
    type: String,
    enum: ["ar", "ru"], // Only Arabic and Russian are supported
    required: true,
  },
  translatedText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Translation = mongoose.model("Translation", translationSchema);

module.exports = Translation;
