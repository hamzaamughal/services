import React, { useState } from "react";
import { toast } from "react-toastify"; // <-- Import toast
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import "./AddPromotionForm.css";
import { useNavigate } from "react-router-dom";

const AddPromotionForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(""); // State for image URL
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create promotion object
    const newPromotion = {
      title,
      description,
      image:
        image ||
        "https://www.shutterstock.com/image-vector/special-offer-banner-vector-template-260nw-2474802375.jpg",
      startDate,
      endDate,
    };

    try {
      const response = await api.post("/promotions", newPromotion);
      console.log("Server response:", response);

      // If status not in 2xx range, show error
      if (response.status < 200 || response.status >= 300) {
        toast.error("Failed to add promotion. Please try again.");
        return;
      }

      // Otherwise, success
      toast.success("Promotion added successfully!");

      // Clear form fields
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setImage("");
      setError("");
      navigate("/promotion");
    } catch (err) {
      console.error("Error adding promotion:", err);
      setError("Failed to add promotion. Please try again.");
      toast.error("Failed to add promotion. Please try again.");
    }
  };

  return (
    <div className="add-promotion-container">
      <form className="add-promotion-form" onSubmit={handleSubmit}>
        <h3>Add New Promotion</h3>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Image (URL for now):</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste an Image URL (optional)"
          />
        </div>

        <button type="submit" className="submit-button">
          Add Promotion
        </button>
      </form>
    </div>
  );
};

export default AddPromotionForm;
