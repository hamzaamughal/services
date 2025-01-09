import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import moment from "moment"; // Import moment for date formatting
import "./PromotionList.css";
import Whatsapp from "./Whatsapp";
import api from "../api";

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // Hardcoded admin for now
  const history = useHistory();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const response = await api.get("/promotions");
        setPromotions(response.data);
      } catch (err) {
        console.error("Error fetching promotions:", err);
        setError("Failed to fetch promotions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <>
      <div className="promotion-list-container">
        <h2 className="promotion-title">Promotions</h2>
        {isAdmin && (
          <button
            className="add-promotion-button"
            onClick={() => history.push("/add-promotion")}
          >
            Add New Promotion
          </button>
        )}
        {loading ? (
          <p className="loading-message">Loading promotions...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : promotions.length === 0 ? (
          <p className="no-promotions-message">
            No promotions available at the moment.
          </p>
        ) : (
          <ul className="promotion-list">
            {promotions.map((promotion, index) => (
              <li key={index} className="promotion-card">
                <div className="promotion-image-container">
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="promotion-image"
                  />
                </div>
                <div className="promotion-content">
                  <h3 className="promotion-name">{promotion.title}</h3>
                  <p className="promotion-description">{promotion.description}</p>
                  <p className="promotion-expiry">
                    Offer valid until:{" "}
                    <span>
                      {moment(promotion.endDate).format("MMMM Do, YYYY [at] h:mm A")}
                    </span>
                  </p>
                  <button
                    className="claim-promotion-button"
                    onClick={() =>
                      alert(`Claimed promotion: ${promotion.title}`)
                    }
                  >
                    Learn More
                  </button>
                </div>
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
      endDate: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

export default PromotionList;
