const express = require("express");
const router = express.Router();
const upload = require("../utils/multer"); // Import Multer config
const {
  createPromotion,
  getPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
} = require("../controllers/promotionController");

router.post("/", upload.single("image"), createPromotion);
router.get("/", getPromotions);
router.get("/:id", getPromotionById);
router.put("/:id", upload.single("image"), updatePromotion);
router.delete("/:id", deletePromotion);

module.exports = router;
