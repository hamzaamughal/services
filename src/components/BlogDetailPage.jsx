// BlogDetailPage.js
import React from 'react';

export const BlogDetailPage = ({ match, blogData }) => {
 const { blogId } = match.params;
 const blogIndex = parseInt(blogId, 10);

 // Check if blogData is available and blogIndex is valid
 if (!blogData || blogIndex < 0 || blogIndex >= blogData.length) {
  return (
   <div className="container" style={{ marginTop: '100px' }}>
    <h1>Blog Post not found</h1>
   </div>
  );
 }

 const selectedBlog = blogData[blogIndex];

 return (
  <div className="container" style={{ marginTop: '100px' }}>
   <h1>{selectedBlog.title}</h1>
   <img src={selectedBlog.largeImage} alt={selectedBlog.title} style={{ maxWidth: "100%", height: "auto" }} />
   <p>Details about {selectedBlog.title} go here. You can add more content, related text, etc.</p>
  </div>
 );
};
