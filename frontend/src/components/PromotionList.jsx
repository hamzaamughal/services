import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Replaces useHistory
import moment from "moment";
import api from "../api";
import "./PromotionList.css";
import Whatsapp from "./Whatsapp";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your Loader component (adjust path as needed)
import Loader from "./Loader";

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          prevPromotions.filter((promotion) => promotion._id !== id)
        );
        toast.error("Promotion deleted successfully!");
      } catch (err) {
        console.error("Error deleting promotion:", err);
        toast.info("Failed to delete the promotion. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="promotion-list-container">
        <h2 className="promotion-title">Our Promotions</h2>
        <div className="add-promotion-container">
          {isAdmin && (
            <button
              className="add-promotion-button"
              onClick={() => navigate("/add-promotion")}
            >
              Add New Promotion
            </button>
          )}
        </div>

        {/* Conditional Rendering for loading/error or the list */}
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : promotions.length === 0 ? (
          <p className="no-promotions-message">
            No promotions available at the moment.
          </p>
        ) : (
          <motion.div
            className="promotion-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {promotions.map((promotion) => (
              <motion.div
                key={promotion._id}
                className="promotion-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {isAdmin && (
                  <motion.button
                    className="delete-promotion-button"
                    onClick={() => handleDelete(promotion._id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    &times;
                  </motion.button>
                )}
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
                      {moment(promotion.endDate).format(
                        "MMMM Do, YYYY [at] h:mm A"
                      )}
                    </span>
                  </p>
                  <motion.button
                    className="claim-promotion-button"
                    onClick={() => toast.success("Claimed successfully!")}
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
