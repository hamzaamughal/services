import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./JurisdictionDetailPage.css";
import Whatsapp from "./Whatsapp";

export const JurisdictionDetailPage = ({ jurisdictionsData }) => {
  // 1) Declare hooks
  const navigate = useNavigate();
  const { jurisdictionRoute } = useParams();

  // 2) Sanitize the route parameter if needed (remove any leading slash)
  const routeParam = jurisdictionRoute.replace("/", "");

  // 3) Check if data is available; if not, return early
  if (!jurisdictionsData || jurisdictionsData.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  // 4) Find the selected jurisdiction
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

  // If not found, return an error message
  if (!selectedJurisdiction) {
    return <h1>Jurisdiction not found</h1>;
  }

  // Destructure the content
  const { name, image, content } = selectedJurisdiction;
  const { title, table } = content || {};

  // Handle empty or missing table
  const tableItems = table || [];
  const half = Math.ceil(tableItems.length / 2);
  const tableFirstHalf = tableItems.slice(0, half);
  const tableSecondHalf = tableItems.slice(half);

  return (
    <div>
      <div className="jurisdiction-detail-container fade-in">
        {/* Back button (fixed) */}
        <div className="fixed-back-button">
          {/* Use navigate(-1) to go back */}
          <button onClick={() => navigate(-1)} className="btn back-btn">
            ← Back
          </button>
        </div>

        {/* Hero / Background Image Section */}
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
          {/* First Card */}
          <div className="card">
            <ul className="benefits-list">
              {tableFirstHalf.map((item, index) => (
                <li key={index}>
                  <strong>{item.benefit}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Second Card */}
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
      </div>
      <Whatsapp />
    </div>
  );
};
