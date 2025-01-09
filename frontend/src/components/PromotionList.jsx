import React from "react";
import PropTypes from "prop-types";
import "./PromotionList.css";
import Whatsapp from "./Whatsapp";

const PromotionList = ({ promotions }) => {
  return (
    <>
      {" "}
      <div className="promotion-list-container">
        <h2 className="promotion-title">Promotions</h2>
        {promotions.length === 0 ? (
          <p className="no-promotions-message">
            No promotions available at the moment.
          </p>
        ) : (
          <ul className="promotion-list">
            {promotions.map((promotion, index) => (
              <li key={index} className="promotion-item">
                <div className="promotion-header">
                  <h3 className="promotion-name">{promotion.title}</h3>
                  <p className="promotion-expiry">
                    Expires on:{" "}
                    <span className="expiry-date">{promotion.expiryDate}</span>
                  </p>
                </div>
                <p className="promotion-description">{promotion.description}</p>
                <button
                  className="claim-promotion-button"
                  onClick={() => alert(`Claimed promotion: ${promotion.title}`)}
                >
                  Claim Now
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Whatsapp />
    </>
  );
};

// Prop types for validation
PromotionList.propTypes = {
  promotions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      expiryDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PromotionList;
