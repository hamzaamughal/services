const validateTranslation = (req, res, next) => {
  const { sourceText, targetLanguage } = req.body;

  if (!sourceText || !targetLanguage) {
    return res.status(400).json({
      message: "Source text and target language are required.",
    });
  }

  if (!["ar", "ru"].includes(targetLanguage)) {
    return res.status(400).json({
      message:
        "Invalid target language. Use 'ar' for Arabic or 'ru' for Russian.",
    });
  }

  next();
};

module.exports = validateTranslation;
