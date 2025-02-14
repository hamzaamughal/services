import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPressReleaseForm.css";
import api from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";

const AddPressReleaseForm = () => {
  const [newPressRelease, setNewPressRelease] = useState({
    title: "",
    content: "",
    date: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- NEW LOADING STATE

  const navigate = useNavigate();

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPressRelease({ ...newPressRelease, [name]: value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPressRelease({ ...newPressRelease, image: file });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { title, content, date, image } = newPressRelease;
    if (!title || !content || !date || !image) {
      setError("All fields, including an image, are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("image", image);

    try {
      setLoading(true); // Start loader
      await api.post("/press-releases", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewPressRelease({
        title: "",
        content: "",
        date: "",
        image: null,
      });
      setError("");

      toast.success("Press release added successfully!");
      navigate("/pressrelease");
    } catch (err) {
      console.error("Error adding press release:", err);
      setError("Failed to add press release. Please try again.");
      toast.error("Failed to add press release. Please try again.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // If loading, show loader instead of the form
  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <form
      className="add-press-release-form"
      onSubmit={handleFormSubmit}
      encType="multipart/form-data"
    >
      <div className="form-group">
        <h2>Add New Press Release</h2>
        {error && <p className="error-message">{error}</p>}
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
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
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
