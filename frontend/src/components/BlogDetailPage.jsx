import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Updated for react-router-dom v6+
import "./BlogDetailPage.css"; // For the fade-in animation and any extra styles.
import Whatsapp from "./Whatsapp";
import api from "../api";

export const BlogDetailPage = () => {
  const navigate = useNavigate(); // Replaced useHistory with useNavigate
  const { id } = useParams(); // Get blog ID from URL parameters
  const [blog, setBlog] = useState(null); // Store the blog data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blogs/${id}`);
        setBlog(response.data); // Assuming API returns the blog object
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle cases where the blog is still loading or there's an error
  if (loading) {
    return (
      <div className="container" style={{ marginTop: "100px", textAlign: "center" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container" style={{ marginTop: "100px", textAlign: "center" }}>
        <h1>{error || "Blog Post not found"}</h1>
        <button onClick={() => navigate(-1)} className="btn back-btn">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-12">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="btn back-btn">
              ← Back
            </button>
          </div>
        </div>
        <div className="row fade-in" style={{ marginTop: "20px" }}>
          {/* Image Section */}
          <div className="col-md-6 col-sm-12 text-center">
            <img
              src={blog.largeImage || blog.image}
              alt={blog.title}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Text Section */}
          <div className="col-md-6 col-sm-12" style={{ marginTop: "20px" }}>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: "#333",
              }}
            >
              {blog.title}
            </h1>
            <hr />
            <p
              style={{
                fontSize: "15px",
                lineHeight: "24px",
                marginTop: "20px",
              }}
            >
              {blog.description}
            </p>
          </div>
        </div>
      </div>
      <Whatsapp />
    </>
  );
};
