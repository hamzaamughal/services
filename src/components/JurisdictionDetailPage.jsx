import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./JurisdictionDetailPage.css";

export const JurisdictionDetailPage = ({ match, jurisdictionsData }) => {
  // 1) Declare all hooks at the top, unconditionally
  const history = useHistory();
  const [showFullContent, setShowFullContent] = useState(false);

  // 2) Get the dynamic route parameter (e.g. "dubai-mainland")
  const routeParam = match.params.jurisdictionRoute.replace("/", "");

  // 3) Check if data is available; if not, return early
  if (!jurisdictionsData || jurisdictionsData.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  // 4) Find the selected jurisdiction
  let selectedJurisdiction = null;
  jurisdictionsData.forEach((category) => {
    // Typically just 1 mainCategory, but we’ll still loop
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

  // 5) Extract content (title & table of benefits) from selectedJurisdiction
  const { title, table } = selectedJurisdiction.content;
  // Show only the first 3 items by default; “See More” toggles the rest
  const visibleTableItems = showFullContent ? table : table.slice(0, 3);

  // 6) Render the Jurisdiction Details
  return (
    <div className="jurisdiction-detail-container fade-in">
      {/* Back button */}
      <div className="fixed-back-button">
        <button onClick={() => history.goBack()} className="btn back-btn">
          ← Back
        </button>
      </div>

      {/* Title */}
      <h1 className="jurisdiction-title">{selectedJurisdiction.name}</h1>
      <hr />

      {/* Content Title / Description */}
      <h2 className="jurisdiction-subtitle">{title}</h2>

      {/* Table of Benefits */}
      <div className="jurisdiction-table-container">
        {visibleTableItems.map((row, idx) => (
          <div className="benefit-row fade-in" key={idx}>
            <h4 className="benefit-title">{row.benefit}</h4>
            <p className="benefit-description">{row.description}</p>
          </div>
        ))}
      </div>

      {/* See More / See Less Button */}
      {table.length > 3 && (
        <div className="see-more-container">
          <button
            className="btn see-more-btn"
            onClick={() => setShowFullContent(!showFullContent)}
          >
            {showFullContent ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};


