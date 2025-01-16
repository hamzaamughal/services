import React, { useState } from "react";
import { toast } from "react-toastify";
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
  const [image, setImage] = useState(null); // File object

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    // Append the file only if it exists
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post("/promotions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server response:", response);

      // If the response status is not in the 2xx range, show an error
      if (response.status < 200 || response.status >= 300) {
        toast.error("Failed to add promotion. Please try again.");
        return;
      }

      // Success
      toast.success("Promotion added successfully!");

      // Clear form fields
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setImage(null);
      navigate("/promotion");
    } catch (err) {
      console.error("Error adding promotion:", err);
      toast.error("Failed to add promotion. Please try again.");
    }
  };

  return (
    <div className="add-promotion-container">
      <form className="add-promotion-form" onSubmit={handleSubmit}>
        <h3>Add New Promotion</h3>

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
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Capture the selected file
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
