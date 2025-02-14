import React from "react";
import Loader from "../components/Loader";

export const Testimonials = (props) => {
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2 className="text-orange">What our clients say</h2>
        </div>
        <div className="row">
          {props.data && props.data.length > 0 ? (
            props.data.map((d, i) => (
              <div key={`${d.name}-${i}`} className="col-md-4 service-item">
                <div className="testimonial">
                  <div className="testimonial-image service-item">
                    <img src={d.img} alt="" />
                  </div>
                  <div className="testimonial-content">
                    <p>"{d.text}"</p>
                    <div className="testimonial-meta">- {d.name}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
