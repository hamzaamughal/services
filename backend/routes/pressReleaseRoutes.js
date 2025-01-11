const express = require("express");
const router = express.Router();
const pressReleaseController = require("../controllers/pressReleaseController");

// CRUD Routes
router.get("/", pressReleaseController.getAllPressReleases);
router.get("/:id", pressReleaseController.getPressReleaseById);
router.post("/", pressReleaseController.createPressRelease);
router.put("/:id", pressReleaseController.updatePressRelease);
router.delete("/:id", pressReleaseController.deletePressRelease);

module.exports = router;
