import React from "react";

export const About = (props) => {
  const data = props.data;

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          {/* Left Column: Image */}
          <div className="col-xs-12 col-md-6">
            <img
              src="img/about.jpg"
              className="img-responsive service-item"
              alt="About"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2 className="text-orange">About Us</h2>
              {/* Paragraph with bold text via HTML */}
              {data ? (
                <p dangerouslySetInnerHTML={{ __html: data.paragraph }} />
              ) : (
                "loading..."
              )}

              {/* Mission */}
              <h3>Our Mission</h3>
              {data ? (
                <p dangerouslySetInnerHTML={{ __html: data.Mission }} />
              ) : (
                "loading..."
              )}

              {/* Why Choose Us */}
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data
                      ? data.Why.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                      ))
                      : "loading..."}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data
                      ? data.Why2.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                      ))
                      : "loading..."}
                  </ul>
                </div>
              </div>

              {/* Closing Paragraph */}
              {data ? (
                <p dangerouslySetInnerHTML={{ __html: data.closingParagraph }} />
              ) : (
                "loading..."
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
