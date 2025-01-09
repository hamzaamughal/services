import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import "./AddPromotionForm.css";

const AddPromotionForm = ({ onAddPromotion }) => {
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [startDate, setStartDate] = useState("");
 const [endDate, setEndDate] = useState("");
 const [image, setImage] = useState(""); // New state for image upload
 const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  const newPromotion = {
   title,
   description,
   image:
    "https://www.shutterstock.com/image-vector/special-offer-banner-vector-template-260nw-2474802375.jpg", // Hardcoded URL for now
   startDate,
   endDate,
  };

  try {
   const response = await api.post("/promotions", newPromotion);
   onAddPromotion(response.data); // Pass the new promotion to the parent
  } catch (err) {
   console.error("Error adding promotion:", err);
   setError("Failed to add promotion. Please try again.");
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
      placeholder="Image URL (Hardcoded for now)"
     />
    </div>
    <button type="submit" className="submit-button">
     Add Promotion
    </button>
   </form>
  </div>
 );
};

AddPromotionForm.propTypes = {
 onAddPromotion: PropTypes.func.isRequired,
};

export default AddPromotionForm;
