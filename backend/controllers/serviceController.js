const Service = require("../models/serviceModel");

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // Validate input data
    if (!title || !description || !image) {
      return res
        .status(400)
        .json({ message: "Title, description, and image are required." });
    }

    const newService = new Service({ title, description, image });
    await newService.save();
    res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating service", error: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
  }
};

// Get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ service });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};

// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
  }
};

// Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
};
