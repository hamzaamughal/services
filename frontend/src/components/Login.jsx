import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log(formData, "formData");

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Both fields are required");
      return;
    }

    setError(""); // Clear any previous error messages

    try {
      // Make API call to authenticate the user
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login response:", response.data);
      const { token, isAdmin, user } = response.data; // Assuming the API returns these fields

      // Store the token and admin status in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin); // If you need admin-specific logic
      localStorage.setItem("user", JSON.stringify(user)); // Save the user data as a string

      // Redirect or show success message
      console.log("Login successful");
      alert("Login successful");
      window.location.href = "/"; // Redirect to homepage or dashboard
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again."); // Show error to the user
    }
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
