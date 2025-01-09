import React from "react";
import { useHistory } from "react-router-dom";
import "./JurisdictionDetailPage.css";
import Whatsapp from "./Whatsapp";

export const JurisdictionDetailPage = ({ match, jurisdictionsData }) => {
  // 1) Declare all hooks at the top, unconditionally
  const history = useHistory();

  // 2) Get the dynamic route parameter (e.g. "dubai-mainland")
  const routeParam = match.params.jurisdictionRoute.replace("/", "");

  // 3) Check if data is available; if not, return early
  if (!jurisdictionsData || jurisdictionsData.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  // 4) Find the selected jurisdiction
  let selectedJurisdiction = null;
  jurisdictionsData.forEach((category) => {
    category.subCategories.forEach((sub) => {
      const cleanRoute = sub.route.replace("/", "");
      if (cleanRoute === routeParam) {
        selectedJurisdiction = sub;
      }
    });
  });

  // If not found, return an error message
  if (!selectedJurisdiction) {
    return <h1>Jurisdiction not found</h1>;
  }

  // Destructure the content
  const { name, image, content } = selectedJurisdiction;
  const { title, table } = content;

  // Let's split the table into two halves for the two “cards”
  const half = Math.ceil(table.length / 2);
  const tableFirstHalf = table.slice(0, half);
  const tableSecondHalf = table.slice(half);

  return (
    <div>
      <div className="jurisdiction-detail-container fade-in">
        {/* Back button (fixed) */}
        <div className="fixed-back-button">
          <button onClick={() => history.goBack()} className="btn back-btn">
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
