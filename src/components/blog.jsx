import React from "react";
import { Image } from "./image";

export const Blog = (props) => {
  return (
    <div id="blog" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Blog</h2>
          <p>
            "Stay Informed – Explore Our Latest Posts!"
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={d.title}
                      largeImage={d.largeImage}
                      smallImage={d.largeImage}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
