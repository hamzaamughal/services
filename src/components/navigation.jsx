import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./navigation.css";

export const Navigation = (props) => {
  const words = ["Services", "Consulting", "Commercial"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words[currentWordIndex];
  const letters = currentWord.split("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(intervalId);
  }, [words.length]);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          {/* Mobile toggle button */}
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          {/* Dynamic Branding with Letter-by-Letter Transition */}
          <a className="navbar-brand page-scroll" href="#page-top" style={{ color: "#4169e1" }}>
            MPRIVE{" "}
            <span className="dynamic-word-container">
              <TransitionGroup component={null}>
                {letters.map((letter, index) => (
                  <CSSTransition
                    key={index}
                    timeout={500}
                    classNames="letter"
                  >
                    <span className="dynamic-letter">{letter}</span>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </span>
          </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#features" className="page-scroll">Features</a></li>
            <li><a href="#about" className="page-scroll">About</a></li>
            <li><a href="#services" className="page-scroll">Services</a></li>
            <li><a href="#portfolio" className="page-scroll">Gallery</a></li>
            <li><a href="#blog" className="page-scroll">Blog</a></li>
            <li><a href="#testimonials" className="page-scroll">Testimonials</a></li>
            <li><a href="#team" className="page-scroll">Team</a></li>
            <li><a href="#contact" className="page-scroll">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
