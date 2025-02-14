import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetailPage.css";
import Whatsapp from "./Whatsapp";
import api from "../api";
import Loader from "./Loader";
// Import toast from react-toastify
import { toast } from "react-toastify";

export const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single blog on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        // Optionally show a toast here if needed:
        // toast.error("Failed to fetch blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle "Delete Blog"
  const handleDelete = async () => {
    try {
      await api.delete(`/blogs/${id}`);
      toast.success("Blog deleted successfully!");
      // Navigate back to the blog list
      navigate("/blog");
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Failed to delete blog. Please try again.");
    }
  };

  // Show loader while fetching
  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  // If no blog found or error
  if (!blog) {
    return (
      <div className="container" style={{ marginTop: "100px", textAlign: "center" }}>
        <h1>Blog post not found</h1>
        {/* You could include a "Back" button if desired */}
      </div>
    );
  }

  // Render the blog details
  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
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

            {/* Delete Button (optional; only if you want to allow deletion here) */}
            <button onClick={handleDelete} className="btn btn-danger" style={{ marginTop: "20px" }}>
              Delete Blog
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp component at the bottom */}
      <Whatsapp />
    </>
  );
};
