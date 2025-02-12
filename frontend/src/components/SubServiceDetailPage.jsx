import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./SubServiceDetailPage.css";
import Whatsapp from "./Whatsapp";
import ContactForm from "./ContactForm";

export const SubServiceDetailPage = ({ jurisdictionsData }) => {
  // Hooks
  const { subServiceRoute } = useParams(); 

  // Remove any leading/trailing slashes if needed (optional)
  const routeParam = subServiceRoute.replace("/", "");

  // Form visibility state
  const [showForm, setShowForm] = useState(true);

  if (!jurisdictionsData || jurisdictionsData.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  // Find "Freezone Authorities" from jurisdictionsData
  const freezoneCategory = jurisdictionsData
    .flatMap((cat) => cat.subCategories || [])
    .find(
      (subCat) =>
        subCat.name === "Freezone Authorities" ||
        subCat.route === "/freezone-authorities"
    );

  if (!freezoneCategory || !freezoneCategory.subServices) {
    return <h1>Freezone Authorities not found</h1>;
  }

  // Find the subService that matches routeParam
  const selectedSubService = freezoneCategory.subServices.find((sub) => {
    const cleanRoute = sub.route.replace("/freezone-authorities/", "");
    return cleanRoute === routeParam;
  });

  if (!selectedSubService) {
    return <h1>Subservice not found</h1>;
  }

  // Extract relevant content from selectedSubService
  const {
    name,
    image,
    content: {
      title,
      introParagraphs = [],
      keyBenefitsTitle,
      keyBenefits = [],
      whyChooseTitle,
      whyChoosePoints = [],
    },
  } = selectedSubService;

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="subservice-detail-container fade-in">
        {/* Hero / Background Image Section */}
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="hero-overlay fade-in">
            <h1 className="subservice-name">{name}</h1>
            <h2 className="subservice-subtitle">{title}</h2>

            {introParagraphs.map((para, idx) => (
              <p key={idx} className="intro-paragraph fade-in">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Two Cards Section */}
        <div className="cards-container fade-in">
          {/* Card 1: Key Benefits */}
          {keyBenefits && keyBenefits.length > 0 && (
            <div className="card fade-in">
              <h3 className="card-title">{keyBenefitsTitle}</h3>
              <ul className="benefits-list">
                {keyBenefits.map((benefit, idx) => (
                  <li key={idx} className="benefit-item">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Card 2: Why Choose */}
          {whyChoosePoints && whyChoosePoints.length > 0 && (
            <div className="card fade-in">
              <h3 className="card-title">{whyChooseTitle}</h3>
              <ul className="benefits-list">
                {whyChoosePoints.map((item, idx) => (
                  <li key={idx} className="benefit-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button className="start-now-button" onClick={() => setShowForm(true)}>
          Start Now
        </button>
      </div>

      <Whatsapp />

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
