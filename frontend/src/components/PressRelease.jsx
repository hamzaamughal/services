import React, { useState, useEffect } from "react";
import api from "../api";
import "./PressRelease.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PressReleases = () => {
  const [pressReleases, setPressReleases] = useState([]);

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Fetch press releases from the API
  useEffect(() => {
    api
      .get("/press-releases")
      .then((response) => {
        setPressReleases(response.data);
      })
      .catch((error) => {
        console.error("Error fetching press releases:", error);
      });
  }, []);

  // Handle delete post
  const deletePost = (id) => {
    api
      .delete(`/press-releases/${id}`)
      .then(() => {
        setPressReleases((prevPosts) =>
          prevPosts.filter((post) => post._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  // Handle "Add Press Release" button click
  const addPressRelease = () => {
    // For now, simulate an action or navigate to an "Add Press Release" page
    navigate("/add-pressrelease");
    // alert("Navigate to 'Add Press Release' form (Feature to be implemented)");
  };

  return (
    <div className="press-releases-page">
      <div className="press-releases-header">
        <h1>OUR PRESS RELEASES</h1>
        {isAdmin && (
          <button
            className="add-press-release-button"
            onClick={addPressRelease}
          >
            Add Press Release
          </button>
        )}
      </div>
      <div className="press-releases-container">
        {pressReleases.map((post) => (
          <div className="press-release-card" key={post._id}>
            {isAdmin && (
              <button
                className="close-button"
                onClick={() => deletePost(post._id)}
              >
                &times;
              </button>
            )}
            <img
              src={post.image}
              alt={post.title}
              className="press-release-image"
            />
            <div className="press-release-content">
              <h2>{post.title}</h2>
              <p className="press-release-date">
                {new Date(post.date).toLocaleDateString()}
              </p>
              {/* Handle description truncation and "Load More" functionality */}
              <Description content={post.content} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for handling truncation and "Load More" functionality
const Description = ({ content }) => {
  const [showFull, setShowFull] = useState(false);

  const toggleShowFull = () => {
    setShowFull(!showFull);
  };

  const shortContent = content.slice(0, 100); // Truncate to 100 characters

  return (
    <div>
      <p className="press-release-description">
        {showFull ? content : `${shortContent}...`}
      </p>
      <button className="load-more-button" onClick={toggleShowFull}>
        {showFull ? "Show Less" : "Load More"}
      </button>
    </div>
  );
};

export default PressReleases;
