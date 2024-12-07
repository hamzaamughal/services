import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Header = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slides = [
    { image: "../img/intro-bg.jpg" },
    { image: "../img/slider2.jpg" },
    { image: "../img/slider3.jpg" },
  ];

  return (
    <header id="header">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="intro"
              style={{
                background: `url(${slide.image}) center center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div className="overlay">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 col-md-offset-2 intro-text">
                      <h1>
                        {props.data ? props.data.title : "Loading"}
                        <span></span>
                      </h1>
                      <p>{props.data ? props.data.paragraph : "Loading"}</p>
                      <a href="#features" className="btn btn-custom btn-lg page-scroll">
                        Learn More
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </header>
  );
};
