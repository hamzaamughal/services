import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import "./AddPressReleaseForm.css";

const AddPressReleaseForm = ({ onAddPressRelease }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [image, setImage] = useState(""); // Optional image upload
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPressRelease = {
      title,
      content,
      // image: image || "https://via.placeholder.com/150", // Default placeholder image if none provided
      publicationDate,
    };

    try {
      const response = await api.post("/press-releases", newPressRelease);
      onAddPressRelease(response.data); // Pass the new press release to the parent
    } catch (err) {
      console.error("Error adding press release:", err);
      setError("Failed to add press release. Please try again.");
    }
  };

  return (
    <div className="add-press-release-container">
      <form className="add-press-release-form" onSubmit={handleSubmit}>
        <h3>Add New Press Release</h3>
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
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Publication Date:</label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Image (Optional):</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL (Optional)"
          />
        </div> */}
        <button
          type="submit"
          className="submit-button"
          onClick={() => {
            console.log("Added Press Release Successfully");
          }}
        >
          Add Press Release
        </button>
      </form>
    </div>
  );
};

AddPressReleaseForm.propTypes = {
  onAddPressRelease: PropTypes.func.isRequired,
};

export default AddPressReleaseForm;
