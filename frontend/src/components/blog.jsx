import React from "react";
import { Image } from "./image";
import { Link } from "react-router-dom";

export const Blog = (props) => {
  return (
    <div id="blog" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2 className="text-orange">Our Blog</h2>
          <p>"Stay Informed – Explore Our Latest Posts!"</p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    {/* Wrap the image in a Link to navigate to the detail page */}
                    <Link to={`/blog/${i}`}>
                      <Image
                        title={d.title}
                        largeImage={d.largeImage}
                        smallImage={d.largeImage}
                      />
                    </Link>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
