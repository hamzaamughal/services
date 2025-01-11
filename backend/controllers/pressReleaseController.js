const PressRelease = require("../models/pressReleseModel");

// Get all press releases
exports.getAllPressReleases = async (req, res) => {
  try {
    const releases = await PressRelease.find();
    console.log(releases);

    res.status(200).json(releases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single press release by ID
exports.getPressReleaseById = async (req, res) => {
  try {
    const release = await PressRelease.findById(req.params.id);
    if (!release) {
      return res.status(404).json({ message: "Press release not found" });
    }
    res.status(200).json(release);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new press release
exports.createPressRelease = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newRelease = new PressRelease({ title, content });
    await newRelease.save();

    res.status(201).json(newRelease);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing press release
exports.updatePressRelease = async (req, res) => {
  try {
    const updatedRelease = await PressRelease.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRelease) {
      return res.status(404).json({ message: "Press release not found" });
    }

    res.status(200).json(updatedRelease);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a press release
exports.deletePressRelease = async (req, res) => {
  try {
    const deletedRelease = await PressRelease.findByIdAndDelete(req.params.id);

    if (!deletedRelease) {
      return res.status(404).json({ message: "Press release not found" });
    }

    res.status(200).json({ message: "Press release deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
