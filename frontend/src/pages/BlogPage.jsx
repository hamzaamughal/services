import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import api from "../api";
import "./BlogPage.css";
import Whatsapp from "../components/Whatsapp";

// Framer Motion for animations
import { motion } from "framer-motion";

const BlogPage = () => {
 const [blogs, setBlogs] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const navigate = useNavigate();

 // Hardcoded admin flag for now
 const admin = true;

 // Fetch blogs on mount
 useEffect(() => {
  const fetchBlogs = async () => {
   try {
    setLoading(true);
    const response = await api.get("/blogs");
    setBlogs(response.data);
   } catch (err) {
    console.error("Error fetching blogs:", err);
    setError("Failed to fetch blogs. Please try again later.");
   } finally {
    setLoading(false);
   }
  };

  fetchBlogs();
 }, []);

 const handleBlogClick = (blogId) => {
  navigate(`/blog/${blogId}`);
 };

 const handleDelete = async (blogId) => {
  try {
   await api.delete(`/blogs/${blogId}`);
   setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== blogId));
  } catch (err) {
   console.error("Error deleting blog:", err);
   alert("Failed to delete blog. Please try again.");
  }
 };

 return (
  <div className="service-page-container">
   <h2 className="service-page-title">Our Blogs</h2>

   {admin && (
    <button
     className="add-blog-button"
     onClick={() => navigate("/add-blog")}
    >
     Add New Blog
    </button>
   )}

   {loading ? (
    <p className="loading-message">Loading blogs...</p>
   ) : error ? (
    <p className="error-message">{error}</p>
   ) : blogs.length === 0 ? (
    <p className="no-blogs-message">No blogs available at the moment.</p>
   ) : (
    // Use motion.div or motion.ul for the container
    <motion.div
     className="blog-cards-container"
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.5 }}
    >
     {blogs.map((blog) => (
      <motion.div
       key={blog._id}
       className="blog-card"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: 20 }}
       transition={{ duration: 0.3 }}
      >
       {/* Delete icon top-right */}
       {admin && (
        <motion.button
         className="delete-icon"
         onClick={(e) => {
          e.stopPropagation();
          handleDelete(blog._id);
         }}
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.95 }}
         title="Delete Blog"
        >
         <i className="fa fa-trash"></i>
        </motion.button>
       )}

       {/* Image on top (or left) */}
       <div
        className="blog-image-container"
        onClick={() => handleBlogClick(blog._id)}
       >
        <img src={blog.image} alt={blog.title} className="blog-image" />
       </div>

       {/* Title, date, description, and "Learn More" button */}
       <div
        className="blog-content"
        onClick={() => handleBlogClick(blog._id)}
       >
        <h3 className="blog-title">{blog.title}</h3>
        {blog.createdAt && (
         <p className="blog-date">
          Published: {moment(blog.createdAt).format("MMMM Do, YYYY")}
         </p>
        )}
        <p className="blog-description">{blog.shortDescription}</p>
        <motion.button
         className="read-more-button"
         onClick={(e) => {
          e.stopPropagation();
          handleBlogClick(blog._id);
         }}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
        >
         Learn More
        </motion.button>
       </div>
      </motion.div>
     ))}
    </motion.div>
   )}
   <Whatsapp />
  </div>
 );
};

export default BlogPage;
