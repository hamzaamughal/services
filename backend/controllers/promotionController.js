const Promotion = require("../models/promotionModel");

// Create a new promotion
exports.createPromotion = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    // Handle image upload (if available)
    const imagePath = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    console.log(imagePath);

    // Create a new promotion object
    const promotion = new Promotion({
      title,
      description,
      startDate,
      endDate,
      image: imagePath, // Save the relative image path in the database
    });

    await promotion.save();

    res.status(201).json({
      message: "Promotion created successfully",
      promotion,
    });
  } catch (error) {
    console.error("Error creating promotion:", error.message);
    res.status(500).json({ error: "Failed to create promotion. Try again!" });
  }
};

// Get all promotions
exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find().sort({ createdAt: -1 });
    res.status(200).json(promotions);
  } catch (error) {
    console.error("Error fetching promotions:", error.message);
    res.status(500).json({ error: "Failed to fetch promotions. Try again!" });
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
    console.error("Error fetching promotion:", error.message);
    res.status(500).json({ error: "Failed to fetch promotion. Try again!" });
  }
};

// Update a promotion
exports.updatePromotion = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    // Handle image update (if a new image is uploaded)
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Build the update object dynamically
    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(image && { image }), // Only update image if a new file is uploaded
    };

    const updatedPromotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPromotion)
      return res.status(404).json({ message: "Promotion not found" });

    res
      .status(200)
      .json({ message: "Promotion updated successfully", updatedPromotion });
  } catch (error) {
    console.error("Error updating promotion:", error.message);
    res.status(500).json({ error: "Failed to update promotion. Try again!" });
  }
};

// Delete a promotion
exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the promotion
    const deletedPromotion = await Promotion.findByIdAndDelete(id);

    if (!deletedPromotion)
      return res.status(404).json({ message: "Promotion not found" });

    res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (error) {
    console.error("Error deleting promotion:", error.message);
    res.status(500).json({ error: "Failed to delete promotion. Try again!" });
  }
};
