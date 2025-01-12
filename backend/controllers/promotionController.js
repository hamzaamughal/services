const Promotion = require("../models/promotionModel");

// Create a new promotion
exports.createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    console.log(promotion);

    await promotion.save();
    res
      .status(201)
      .json({ message: "Promotion created successfully", promotion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all promotions
exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single promotion by ID
exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion)
      return res.status(404).json({ message: "Promotion not found" });
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a promotion
exports.updatePromotion = async (req, res) => {
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPromotion)
      return res.status(404).json({ message: "Promotion not found" });
    res
      .status(200)
      .json({ message: "Promotion updated successfully", updatedPromotion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a promotion
exports.deletePromotion = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body, "boduyyyyyyyy");

    console.log(id, "id");

    const deletedPromotion = await Promotion.findByIdAndDelete(id);
    if (!deletedPromotion)
      return res.status(404).json({ message: "Promotion not found" });
    res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
