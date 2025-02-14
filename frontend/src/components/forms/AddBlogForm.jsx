import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import "./AddBlogForm.css";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!title.trim() || !description.trim()) {
      setError("Title and description cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await api.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Success toast
      toast.success("Blog added successfully!");

      // Clear form
      setTitle("");
      setDescription("");
      setImage(null);
      setError("");

      // Navigate back to the blog listing page
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
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
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
