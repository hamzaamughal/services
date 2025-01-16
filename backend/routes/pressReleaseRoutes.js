const express = require("express");
const router = express.Router();
const pressReleaseController = require("../controllers/pressReleaseController");
const upload = require("../utils/multer");

// CRUD Routes
router.get("/", pressReleaseController.getAllPressReleases);
router.get("/:id", pressReleaseController.getPressReleaseById);
router.post(
  "/",
  upload.single("image"),
  pressReleaseController.createPressRelease
);
router.put("/:id", pressReleaseController.updatePressRelease);
router.delete("/:id", pressReleaseController.deletePressRelease);

module.exports = router;
