const { Translate } = require("@google-cloud/translate").v2;

// Initialize Google Translate client
const translate = new Translate({
  key: "process.env.GOOGLE_TRANSLATE_API_KEY", // Replace with your API key
});

// Function to translate text using Google Translate API
exports.translateText = async (text, sourceLanguage, targetLanguage) => {
  try {
    const [translation] = await translate.translate(text, {
      from: sourceLanguage,
      to: targetLanguage,
    });

    return translation;
  } catch (error) {
    throw new Error("Google Translate API failed: " + error.message);
  }
};
