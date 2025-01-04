import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      setSuccess("");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { formData }
      );
      console.log(response.data);
    } catch (error) {
      setError(error.message);
      console.log(error.message, "error");
    }

    // Submit form logic (API call can go here)
    console.log("Registration Successful:", formData);
    setError("");
    setSuccess("Registration successful! You can now log in.");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
        <p className="login-link">
          Already have an account? <Link to="/user/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
