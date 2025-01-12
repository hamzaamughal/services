import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import "./AddBlogForm.css";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description cannot be empty.");
      return;
    }

    const newBlog = {
      title,
      description,
      image:
        "https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=900&auto=format&fit=crop&q=60",
    };

    try {
      await api.post("/blogs", newBlog);
      // If success (2xx), show toast, navigate, etc.
      toast.success("Blog added successfully!");
      setTitle("");
      setDescription("");
      setError("");
      navigate("/blog");
    } catch (err) {
      console.error("Error adding blog:", err);
      toast.error("Failed to add blog. Please try again.");
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
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter blog description"
            required
          />
        </div>
        <div className="form-group">
          <label>Image (Hardcoded):</label>
          <input
            type="text"
            value="https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=900&auto=format&fit=crop&q=60"
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
