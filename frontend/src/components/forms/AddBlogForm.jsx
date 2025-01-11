import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import "./AddBlogForm.css";

const AddBlogForm = ({ onAddBlog }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      description,
      image:
        "https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGJsb2d8ZW58MHx8MHx8fDA%3D.jpg", // Hardcoded image URL
    };

    try {
      const response = await api.post("/blogs", newBlog);
      onAddBlog(response.data); // Pass the new blog to the parent
      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      console.error("Error adding blog:", err);
      setError("Failed to add blog. Please try again.");
    }
  };

  return (
    <div className="add-blog-container">
      <form className="add-blog-form" onSubmit={handleSubmit}>
        <h3>Add New Blog</h3>
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
          <label>Image (Hardcoded):</label>
          <input
            type="text"
            value="https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGJsb2d8ZW58MHx8MHx8fDA%3D"
            disabled
            readOnly
          />
        </div>
        <button type="submit" className="submit-button">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;
