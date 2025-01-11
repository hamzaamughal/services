import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import "./PressRelease.css"; // Ensure the CSS file is correctly linked
import Whatsapp from "./Whatsapp";

const PressRelease = () => {
  const [releases, setReleases] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isAdmin, setIsAdmin] = useState(true); // Simulate admin status (hardcoded for now)

  const history = useHistory();

  useEffect(() => {
    // Fetch data from the server
    const fetchPressReleases = async () => {
      try {
        const response = await api.get("/press-releases"); // Fetch from your server URL
        console.log(response.data);

        setReleases(response.data); // Store the fetched data
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchPressReleases();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleDelete = async (id) => {
    try {
      await api.delete(`/press-releases/${id}`); // Delete from your server
      setReleases(releases.filter((release) => release._id !== id)); // Update state after deletion
    } catch (err) {
      console.error("Failed to delete press release:", err.message);
    }
  };

  // Handle loading state
  if (loading) {
    return <p>Loading press releases...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Handle empty data
  if (!releases.length) {
    return <p>No press releases available.</p>;
  }

  return (
    <div className="press-release-list">
      {/* Show "Add New Press Release" button for admins */}
      {isAdmin && (
        <div className="press-release-actions">
          <button
            className="add-new-press-release"
            onClick={() => history.push("/add-pressrelease")}
          >
            Add New Press Release
          </button>
        </div>
      )}

      {/* Render list of press releases */}
      {releases.map((release) => (
        <div
          className="press-release-container"
          key={release.id || release._id}
        >
          <div className="press-release-header">
            <h1 className="press-release-title">{release.title}</h1>
            <p className="press-release-date">
              {new Date(release.date).toLocaleDateString()}
            </p>
          </div>

          <div className="press-release-content">
            <p>{release.content}</p>
          </div>

          {/* Delete button visible only for admins */}
          {true && (
            <button
              className="delete-press-release"
              onClick={() => handleDelete(release._id)}
            >
              ✖
            </button>
          )}
        </div>
      ))}

      <Whatsapp />
    </div>
  );
};

export default PressRelease;
