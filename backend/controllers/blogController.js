const Blog = require("../models/blogModal");

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
 try {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
 } catch (error) {
  res.status(500).json({ message: "Error fetching blogs", error: error.message });
 }
};


// @desc    Get a blog by ID
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res) => {
 try {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
   return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
 } catch (error) {
  res.status(500).json({ message: "Error fetching blog", error: error.message });
 }
};

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res) => {
 try {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).json({ message: "Blog created successfully", blog });
 } catch (error) {
  res.status(500).json({ message: "Error creating blog", error: error.message });
 }
};

// @desc    Update a blog by ID
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res) => {
 try {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!blog) {
   return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json({ message: "Blog updated successfully", blog });
 } catch (error) {
  res.status(500).json({ message: "Error updating blog", error: error.message });
 }
};

// @desc    Delete a blog by ID
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res) => {
 try {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) {
   return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json({ message: "Blog deleted successfully" });
 } catch (error) {
  res.status(500).json({ message: "Error deleting blog", error: error.message });
 }
};