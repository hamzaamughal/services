import React from "react";
import { useHistory } from "react-router-dom";
import "./ServiceDetailPage.css";

/**
 * Utility function to parse the HTML description string.
 * - Extracts the first <h2><strong>...</strong></h2> as 'introTitle'.
 * - Takes everything before the first <h3> as 'introText'.
 * - Splits each <h3><strong>Some Heading</strong></h3> (and the content until the next <h3>) into sections.
 */
function parseDescriptionIntoSections(html) {
  // 1) Extract <h2><strong>...</strong></h2> as introTitle (if present).
  const h2Regex = /<h2><strong>(.*?)<\/strong><\/h2>/;
  let introTitle = "";
  const h2Match = html.match(h2Regex);
  if (h2Match) {
    introTitle = h2Match[1]; // text inside <h2><strong>...</strong></h2>
    // Remove that <h2> block from the HTML so it doesn't interfere with further splitting
    html = html.replace(h2Regex, "");
  }

  // 2) We'll split the content by <h3><strong>…</strong></h3> sections
  //    The 's' (dotAll) flag lets '.' match newlines.
  const sectionRegex = /<h3><strong>(.*?)<\/strong><\/h3>((?:(?!<h3><strong>).)*)/gs;

  let sections = [];
  let match;
  while ((match = sectionRegex.exec(html)) !== null) {
    sections.push({
      heading: match[1], // text inside <h3><strong>…</strong></h3>
      body: match[2],    // HTML until the next <h3> or end
    });
  }

  // 3) Everything before the first <h3> match is 'introText'.
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

  // 1) Data guard
  if (!servicesData || servicesData.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  // 2) Find the selected service
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

  // 3) Parse the description HTML
  const { introTitle, introText, sections } = parseDescriptionIntoSections(
    selectedService.description || ""
  );

  return (
    <div className="service-detail-container fade-in">
      {/* Back Button ABOVE the image now */}
      <div className="back-button-container">
        <button onClick={() => history.goBack()} className="btn back-btn">
          ← Back
        </button>
      </div>

      {/* Top Section (image + name + intro) */}
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

          {/* If we found an <h2> in the HTML, show it as an intro heading */}
          {introTitle && <h2 className="service-intro-title">{introTitle}</h2>}

          {/* Intro text (before first <h3>) */}
          {introText && (
            <div
              className="service-intro-text"
              dangerouslySetInnerHTML={{ __html: introText }}
            />
          )}

          {/* If there's a zoneName, display it here (optional) */}
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

      {/* Cards for each <h3> section */}
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
  );
};
