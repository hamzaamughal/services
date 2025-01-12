import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Replaces useHistory
import moment from "moment";
import api from "../api";
import "./PromotionList.css";
import Whatsapp from "./Whatsapp";

// 1) Import Framer Motion
import { motion } from "framer-motion";

import useAuth from "../hooks/useAuth";

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useNavigate from React Router v6
  const navigate = useNavigate();

  const { isAdmin } = useAuth();

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await api.delete(`/promotions/${id}`);
        setPromotions((prevPromotions) =>
          prevPromotions.filter((promotion) => promotion.id !== id)
        );
        alert("Promotion deleted successfully!");
      } catch (err) {
        console.error("Error deleting promotion:", err);
        alert("Failed to delete the promotion. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="promotion-list-container">
        <h2 className="promotion-title">Our Promotions</h2>
        <div className="add-promotion-container">
          {
            isAdmin && <button
              className="add-promotion-button"
              onClick={() => navigate("/add-promotion")}
            >
              Add New Promotion
            </button>}
        </div>

        {loading ? (
          <p className="loading-message">Loading promotions...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : promotions.length === 0 ? (
          <p className="no-promotions-message">
            No promotions available at the moment.
          </p>
        ) : (
          // 2) Use a motion.div container for the grid
          <motion.div
            className="promotion-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {promotions.map((promotion) => (
              // 3) Animate each promotion card
              <motion.div
                key={promotion.id}
                className="promotion-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Delete button at top-right */}
                {isAdmin && (
                  <motion.button
                    className="delete-promotion-button"
                    onClick={() => handleDelete(promotion.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    &times;
                  </motion.button>
                )}

                {/* Image on the left */}
                <div className="promotion-image-container">
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="promotion-image"
                  />
                </div>

                {/* Content on the right */}
                <div className="promotion-content">
                  <h3 className="promotion-name">{promotion.title}</h3>
                  <p className="promotion-description">
                    {promotion.description}
                  </p>
                  <p className="promotion-expiry">
                    Offer valid until:{" "}
                    <span>
                      {moment(promotion.endDate).format(
                        "MMMM Do, YYYY [at] h:mm A"
                      )}
                    </span>
                  </p>
                  <motion.button
                    className="claim-promotion-button"
                    onClick={() =>
                      alert(`Claimed promotion: ${promotion.title}`)
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <Whatsapp />
    </>
  );
};

export default PromotionList;
