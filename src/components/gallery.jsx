import { Image } from "./image";
import React from "react";
import { Link } from "react-router-dom";

export const Gallery = (props) => {
  if (!props.data || props.data.length === 0) {
    // Display loading while data is unavailable
    return (
      <div id="portfolio" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Gallery</h2>
            <p>"Bringing Vision to Life – Explore Our Gallery of Innovative Projects!"</p>
          </div>
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>"Bringing Vision to Life – Explore Our Gallery of Innovative Projects!"</p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data.map((d, i) => (
              <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                <Link to={`/gallery/${i}`}>
                  <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
