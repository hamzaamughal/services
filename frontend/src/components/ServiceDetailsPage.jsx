import React from "react";
import { useHistory } from "react-router-dom";
import "./ServiceDetailPage.css";
import Whatsapp from "./Whatsapp";

/**
 * Utility function to parse the HTML description string.
 */
function parseDescriptionIntoSections(html) {
  const h2Regex = /<h2><strong>(.*?)<\/strong><\/h2>/;
  let introTitle = "";
  const h2Match = html.match(h2Regex);
  if (h2Match) {
    introTitle = h2Match[1];
    html = html.replace(h2Regex, "");
  }

  const sectionRegex =
    /<h3><strong>(.*?)<\/strong><\/h3>((?:(?!<h3><strong>).)*)/gs;
  let sections = [];
  let match;
  while ((match = sectionRegex.exec(html)) !== null) {
    sections.push({
      heading: match[1],
      body: match[2],
    });
  }

  const firstSectionIndex = html.search(/<h3><strong>/);
  let introText = "";

  if (firstSectionIndex > 0) {
    introText = html.substring(0, firstSectionIndex).trim();
  }

  return { introTitle, introText, sections };
}

export const ServiceDetailPage = ({ match, servicesData }) => {
  const history = useHistory();
  const routeParam = match.params.serviceRoute;

  if (!servicesData || servicesData.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  let selectedService = null;
  servicesData.forEach((category) => {
    category.subCategories.forEach((sub) => {
      const cleanRoute = sub.route.replace("/", "");
      if (cleanRoute === routeParam) {
        selectedService = sub;
      }
    });
  });

  if (!selectedService) {
    return <h1>Service not found</h1>;
  }

  const { introTitle, introText, sections } = parseDescriptionIntoSections(
    selectedService.description || ""
  );

  return (
    <div>
      <div className="service-detail-container fade-in">
        <div className="back-button-container">
          <button onClick={() => history.goBack()} className="btn back-btn">
            ← Back
          </button>
        </div>

        <div className="service-top-section fade-in">
          <div className="service-image-wrapper">
            <img
              src={selectedService.image}
              alt={selectedService.name}
              className="service-detail-image"
            />
          </div>

          <div className="service-info-wrapper">
            <h1 className="service-name">{selectedService.name}</h1>
            {introTitle && (
              <h2 className="service-intro-title">{introTitle}</h2>
            )}
            {introText && (
              <div
                className="service-intro-text"
                dangerouslySetInnerHTML={{ __html: introText }}
              />
            )}
            {selectedService.zoneName && (
              <div className="zone-block">
                <h3 className="zone-title">Zone: {selectedService.zoneName}</h3>
                <p className="zone-description">
                  {selectedService.zoneDescription}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="service-cards-container fade-in">
          {sections.map((section, idx) => (
            <div className="service-card" key={idx}>
              <h3 className="service-card-heading">{section.heading}</h3>
              <div
                className="service-card-body"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </div>
          ))}
        </div>
      </div>
      <Whatsapp />
    </div>
  );
};
