const Translation = require("../models/translationModel");
const googleTranslate = require("../utils/googleTranslation");

// Translate English text to Russian or Arabic
exports.translateText = async (req, res) => {
  const { sourceText, targetLanguage, useManual } = req.body;

  // Validate target language
  if (!["ar", "ru"].includes(targetLanguage)) {
    return res.status(400).json({
      message:
        "Invalid target language. Use 'ar' for Arabic or 'ru' for Russian.",
    });
  }

  try {
    // Check for manual translation if `useManual` is true
    if (useManual) {
      const manualTranslation = await Translation.findOne({
        sourceText: sourceText.toLowerCase(),
        targetLanguage,
      });

      if (manualTranslation) {
        return res.status(200).json({
          translation: manualTranslation.translatedText,
          source: "manual",
        });
      }
    }

    // Fallback to Google Translate
    const googleTranslatedText = await googleTranslate.translateText(
      sourceText,
      "en",
      targetLanguage
    );

    return res.status(200).json({
      translation: googleTranslatedText,
      source: "google",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Translation failed", error: error.message });
  }
};

// Add a manual translation
exports.addManualTranslation = async (req, res) => {
  const { sourceText, targetLanguage, translatedText } = req.body;

  // Validate target language
  if (!["ar", "ru"].includes(targetLanguage)) {
    return res.status(400).json({
      message:
        "Invalid target language. Use 'ar' for Arabic or 'ru' for Russian.",
    });
  }

  try {
    const newTranslation = new Translation({
      sourceText: sourceText.toLowerCase(),
      targetLanguage,
      translatedText,
    });

    await newTranslation.save();
    res.status(201).json({
      message: "Manual translation added successfully",
      translation: newTranslation,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding manual translation",
      error: error.message,
    });
  }
};

// Get all manual translations
exports.getAllManualTranslations = async (req, res) => {
  try {
    const translations = await Translation.find();
    res.status(200).json({ translations });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching manual translations",
      error: error.message,
    });
  }
};
