import React from "react";
import "./PressRelease.css"; // Ensure the CSS file is correctly linked
import Whatsapp from "./Whatsapp";

const PressRelease = ({ release }) => {
  return (
    <>
      {release.map((release) => {
        return (
          <div className="press-release-container">
            <div className="press-release-header">
              <h1 className="press-release-title">{release.title}</h1>
              <p className="press-release-date">{release.date}</p>
            </div>

            <div className="press-release-content">
              <p>{release.content}</p>
            </div>

            <div className="press-release-footer">
              <button
                className="press-release-button"
                onClick={() => window.history.back()}
              >
                Back to News
              </button>
            </div>
          </div>
        );
      })}

      <Whatsapp />
    </>
  );
};

export default PressRelease;
