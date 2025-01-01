const express = require("express");
const router = express.Router();
const translationController = require("../controllers/translationController");

// Translation routes
router.post("/translate", translationController.translateText); // Translate text
router.post("/translations", translationController.addManualTranslation); // Add a manual translation
router.get("/translations", translationController.getAllManualTranslations); // Get all manual translations

module.exports = router;
