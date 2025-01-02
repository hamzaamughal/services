const express = require("express");
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// CRUD operations for services
router.post("/services", createService); // Create a service
router.get("/services", getAllServices); // Get all services
router.get("/services/:id", getServiceById); // Get a service by ID
router.put("/services/:id", updateService); // Update a service by ID
router.delete("/services/:id", deleteService); // Delete a service by ID

module.exports = router;
