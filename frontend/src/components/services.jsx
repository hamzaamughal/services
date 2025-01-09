import React from "react";
import "./services.css";
import { Link } from "react-router-dom";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2 className="text-orange">Our Services</h2>
          <p>
            Building Businesses and Bridging Borders – Your Partner in Formation
            and Visa Success
          </p>
        </div>
        <div className="row">
          {props.data && props.data.length > 0 ? (
            props.data.map((category, i) => (
              <div key={i} className="col-md-4 service-item">
                <i className={category.icon}></i>
                <div className="service-desc">
                  <h3>{category.mainCategory}</h3>
                  {category.subCategories &&
                    category.subCategories.length > 0 && (
                      <ul className="subcategories-list">
                        {category.subCategories.map((sub, sIndex) => (
                          <li key={sIndex}>
                            <Link
                              to={`/services${sub.route}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </div>
            ))
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </div>
  );
};
