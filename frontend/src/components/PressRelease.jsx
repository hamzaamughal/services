import React, { useState, useEffect } from "react";
import api from "../api";
import "./PressRelease.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader"; // Adjust path if needed

const PressReleases = () => {
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Fetch press releases from the API
  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        setLoading(true);
        const response = await api.get("/press-releases");
        setPressReleases(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching press releases:", err);
        setError("Failed to load press releases. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPressReleases();
  }, []);

  // Handle delete post
  const deletePost = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/press-releases/${id}`); // Use correct string interpolation
      toast.success("Press release deleted successfully!");
      setPressReleases((prevPosts) =>
        prevPosts.filter((post) => post._id !== id)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete the press release.");
      setError("Failed to delete the press release.");
    } finally {
      setLoading(false);
    }
  };

  // Handle "Add Press Release" button click
  const addPressRelease = () => {
    navigate("/add-pressrelease");
  };

  // Show loader while fetching or deleting
  if (loading) {
    return (
      <div className="container" style={{ marginTop: "100px", textAlign: "center" }}>
        <Loader />
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="container" style={{ marginTop: "100px", textAlign: "center" }}>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="press-releases-page" style={{ marginTop: "40px" }}>
      <div className="press-releases-header">
        <h1>OUR PRESS RELEASES</h1>
        {isAdmin && (
          <button className="add-press-release-button" onClick={addPressRelease}>
            Add Press Release
          </button>
        )}
      </div>
      <div className="press-releases-container">
        {pressReleases.length === 0 ? (
          <p>No press releases available.</p>
        ) : (
          pressReleases.map((post) => (
            <div className="press-release-card fade-in" key={post._id}>
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
                <Description content={post.content} />
              </div>
            </div>
          ))
        )}
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
