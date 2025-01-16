import React, { useState, useEffect } from "react";
import { Image } from "./image";
import api from "../api";
import { Link } from "react-router-dom";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const { data } = await api.get("/blogs");
        // Assuming the blogs are sorted by latest first. If not, sort them before slicing.
        setBlogs(data.slice(0, 6)); // Take only the first 6 blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    getBlogData();
  }, []);

  return (
    <div id="blog" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2 className="text-orange">Our Blog</h2>
          <p>"Stay Informed – Explore Our Latest Posts!"</p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="col-sm-6 col-md-4 col-lg-4">
                  {/* Wrap the image in a Link to navigate to the detail page */}
                  <Link to={`/blog/${blog._id}`}>
                    <Image title={blog.title} smallImage={blog.image} />
                  </Link>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
