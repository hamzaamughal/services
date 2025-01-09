import React from "react";
import { useHistory } from "react-router-dom";
import "./BlogDetailPage.css"; // For the fade-in animation and any extra styles.
import Whatsapp from "./Whatsapp";

export const BlogDetailPage = ({ match, blogData }) => {
  const history = useHistory();
  const { blogId } = match.params;
  const blogIndex = parseInt(blogId, 10);

  // Check if blogData is still loading or blogId is invalid
  if (!blogData) {
    return (
      <div
        className="container"
        style={{ marginTop: "100px", textAlign: "center" }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  if (blogIndex < 0 || blogIndex >= blogData.length) {
    return (
      <div
        className="container"
        style={{ marginTop: "100px", textAlign: "center" }}
      >
        <h1>Blog Post not found</h1>
      </div>
    );
  }

  const selectedBlog = blogData[blogIndex];

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-12">
            {/* Back Button at the top */}
            <button onClick={() => history.goBack()} className="btn back-btn">
              ← Back
            </button>
          </div>
        </div>
        <div className="row fade-in" style={{ marginTop: "20px" }}>
          {/* Image Section */}
          <div className="col-md-6 col-sm-12 text-center">
            <img
              src={selectedBlog.largeImage}
              alt={selectedBlog.title}
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
              {selectedBlog.title}
            </h1>
            <hr />
            <p
              style={{
                fontSize: "15px",
                lineHeight: "24px",
                marginTop: "20px",
              }}
            >
              {selectedBlog.description}
            </p>
          </div>
        </div>
      </div>
      <Whatsapp />
    </>
  );
};
