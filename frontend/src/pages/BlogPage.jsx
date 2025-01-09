import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment"; // For date formatting
import api from "../api";
import "./BlogPage.css";
import Whatsapp from "../components/Whatsapp";

const BlogPage = () => {
 const [blogs, setBlogs] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const history = useHistory();

 // Hardcoded admin flag for now
 const admin = true;

 // Fetch blogs on component mount
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

 // Navigate to blog details page on click
 const handleBlogClick = (blogId) => {
  history.push(`/blog/${blogId}`);
 };

 // Delete a blog
 const handleDelete = async (blogId) => {
  try {
   await api.delete(`/blogs/${blogId}`);
   setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
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
     onClick={() => history.push("/add-blog")}
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
    <ul className="blog-list">
     {blogs.map((blog) => (
      <li key={blog._id} className="blog-card">
       <div className="blog-image-container">
        <img src={blog.image} alt={blog.title} className="blog-image" />
       </div>
       <div className="blog-content">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">{blog.shortDescription}</p>
        {blog.createdAt && (
         <p className="blog-date">
          Published: {moment(blog.createdAt).format("MMMM Do, YYYY")}
         </p>
        )}
        <button
         className="read-more-button"
         onClick={() => handleBlogClick(blog._id)}
        >
         Read More
        </button>
       </div>
       {admin && (
        <button
         className="delete-icon"
         onClick={() => handleDelete(blog._id)}
         title="Delete Blog"
        >
         <i className="fa fa-trash"></i>
        </button>
       )}
      </li>
     ))}
    </ul>
   )}
   <Whatsapp />
  </div>
 );
};

export default BlogPage;
