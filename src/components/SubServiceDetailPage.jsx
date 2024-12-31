import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SubServiceDetailPage.css";

export const SubServiceDetailPage = ({ match, jurisdictionsData }) => {
  // 1) Hooks
  const history = useHistory();

  // We'll track "see more" toggles separately for Key Benefits and Why Choose points
  const [showAllKeyBenefits, setShowAllKeyBenefits] = useState(false);
  const [showAllWhyChoose, setShowAllWhyChoose] = useState(false);

  // 2) Extract subService route from the URL
  const routeParam = match.params.subServiceRoute.replace("/", "");

  // 3) Check if data is available
  if (!jurisdictionsData || jurisdictionsData.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  // 4) Find "Freezone Authorities" from jurisdictionsData
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

  // 5) Find the subService that matches routeParam
  const selectedSubService = freezoneCategory.subServices.find((sub) => {
    const cleanRoute = sub.route.replace("/freezone-authorities/", "");
    return cleanRoute === routeParam;
  });

  if (!selectedSubService) {
    return <h1>Subservice not found</h1>;
  }

  // 6) Extract relevant content from selectedSubService
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

  // Decide how many bullet points to show by default
  const visibleKeyBenefits = showAllKeyBenefits
    ? keyBenefits
    : keyBenefits.slice(0, 3);
  const visibleWhyChoose = showAllWhyChoose
    ? whyChoosePoints
    : whyChoosePoints.slice(0, 3);

  // 7) Render
  return (
    <div className="subservice-detail-container fade-in">
      {/* Back button */}
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
              {visibleKeyBenefits.map((benefit, idx) => (
                <li key={idx} className="benefit-item">
                  {benefit}
                </li>
              ))}
            </ul>

            {keyBenefits.length > 3 && (
              <div className="see-more-container">
                <button
                  className="btn see-more-btn"
                  onClick={() => setShowAllKeyBenefits(!showAllKeyBenefits)}
                >
                  {showAllKeyBenefits ? "See Less" : "See More"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Card 2: Why Choose */}
        {whyChoosePoints && whyChoosePoints.length > 0 && (
          <div className="card fade-in">
            <h3 className="card-title">{whyChooseTitle}</h3>
            <ul className="benefits-list">
              {visibleWhyChoose.map((item, idx) => (
                <li key={idx} className="benefit-item">
                  {item}
                </li>
              ))}
            </ul>

            {whyChoosePoints.length > 3 && (
              <div className="see-more-container">
                <button
                  className="btn see-more-btn"
                  onClick={() => setShowAllWhyChoose(!showAllWhyChoose)}
                >
                  {showAllWhyChoose ? "See Less" : "See More"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
