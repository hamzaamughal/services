import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPressReleaseForm.css";
import api from "../../api";

const AddPressReleaseForm = ({ onSubmit }) => {
  const [newPressRelease, setNewPressRelease] = useState({
    title: "",
    content: "",
    date: "",
    image:
      "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
  });
  const navigate = useNavigate();

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPressRelease({ ...newPressRelease, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/press-releases", newPressRelease);
      if (onSubmit) {
        onSubmit(response);
      }
      setNewPressRelease({
        title: "",
        content: "",
        date: "",
        image:
          "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      });

      // Navigate to the press release page
      navigate("/pressrelease");
    } catch (err) {
      console.error("Error adding press release:", err);
    }
  };

  return (
    <form className="add-press-release-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <h2>Add New Press Release</h2>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newPressRelease.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={newPressRelease.content}
          onChange={handleInputChange}
          rows="4"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={newPressRelease.date}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={newPressRelease.image}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">
          Add New Press Release
        </button>
      </div>
    </form>
  );
};

export default AddPressReleaseForm;
