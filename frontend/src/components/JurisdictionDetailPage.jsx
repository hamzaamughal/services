import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./JurisdictionDetailPage.css";
import Whatsapp from "./Whatsapp";
import ContactForm from "./ContactForm";

export const JurisdictionDetailPage = ({ jurisdictionsData }) => {
  const [showForm, setShowForm] = useState(true); // State to toggle the form popup
  const navigate = useNavigate();
  const { jurisdictionRoute } = useParams();

  const routeParam = jurisdictionRoute.replace("/", "");

  if (!jurisdictionsData || jurisdictionsData.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  let selectedJurisdiction = null;
  jurisdictionsData.forEach((category) => {
    if (category.subCategories) {
      category.subCategories.forEach((sub) => {
        const cleanRoute = sub.route.replace("/", "");
        if (cleanRoute === routeParam) {
          selectedJurisdiction = sub;
        }
      });
    }
  });

  if (!selectedJurisdiction) {
    return <h1>Jurisdiction not found</h1>;
  }

  const { name, image, content } = selectedJurisdiction;
  const { title, table } = content || {};

  const tableItems = table || [];
  const half = Math.ceil(tableItems.length / 2);
  const tableFirstHalf = tableItems.slice(0, half);
  const tableSecondHalf = tableItems.slice(half);

  // Close the form popup
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="jurisdiction-detail-container fade-in">
        {/* Back button */}
        <div className="fixed-back-button">
          <button onClick={() => navigate(-1)} className="btn back-btn">
            ← Back
          </button>
        </div>

        {/* Hero Section */}
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="hero-overlay fade-in">
            <h1 className="jurisdiction-name">{name}</h1>
            <h2 className="jurisdiction-content-title">{title}</h2>
          </div>
        </div>

        {/* Cards Section */}
        <div className="cards-container fade-in">
          <div className="card">
            <ul className="benefits-list">
              {tableFirstHalf.map((item, index) => (
                <li key={index}>
                  <strong>{item.benefit}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <ul className="benefits-list">
              {tableSecondHalf.map((item, index) => (
                <li key={index}>
                  <strong>{item.benefit}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="start-now-button-parent">
          <button
            className="start-now-button"
            onClick={() => setShowForm(true)}
          >
            Start Now
          </button>
        </div>
      </div>

      {/* WhatsApp Component */}
      <Whatsapp />

      {/* ContactForm Popup */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <ContactForm handleCloseForm={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
};
