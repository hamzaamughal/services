import React, { useState } from "react";
import api from "../api";
import "react-phone-input-2/lib/style.css"; // Import the styles for phone input
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { toast, ToastContainer } from "react-toastify";
import "./ContactForm.css";
import PhoneInput from "react-phone-input-2";

const ContactForm = ({ handleCloseForm }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled before submission
    const { fullName, email, phone, message } = formData;
    if (!fullName || !email || !phone || !message) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const response = await api.post("/contact", formData);
      toast.success(response.data.message);

      // Clear the form data
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Close the form after a short delay
      setTimeout(() => {
        handleCloseForm();
      }, 2000);
    } catch (error) {
      toast.error("Error submitting the form. Please try again later.");
    }
  };

  return (
    <div className="contact-form-container">
      {/* Toast container to display messages */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="form-header">
        <button className="close-btn" onClick={handleCloseForm}>
          ✖
        </button>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <h3>Get in Touch</h3>
        <input
          type="text"
          name="fullName"
          placeholder="Type Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Type Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <PhoneInput
          country={"us"} // Set default country
          value={formData.phone}
          onChange={handlePhoneChange}
          enableSearch={true}
          inputStyle={{
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "15px",
          }}
          buttonStyle={{
            border: "1px solid #ccc",
            borderRadius: "5px 0 0 5px",
          }}
          containerStyle={{
            marginBottom: "15px",
          }}
        />
        <textarea
          name="message"
          placeholder="Type Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Submit</button>
        <p>
          I consent to the collection of my name, email address, and phone
          number for contact purposes.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
