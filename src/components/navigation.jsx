import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./navigation.css";
import { Link } from "react-router-dom";

export const Navigation = ({ data: servicesData }) => {
  const words = ["Services", "Consulting", "Commercial"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words[currentWordIndex];
  const letters = currentWord.split("");

  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [words.length]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top" ref={navRef}>
      <div className="container">
        <div className="navbar-header">
          {/* Mobile toggle button */}
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            onClick={() => setServicesDropdownOpen(false)} // Close dropdown when toggling nav
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          {/* Dynamic Branding */}
          <Link to="/" className="navbar-brand page-scroll" style={{ color: "#4169e1" }}>
            MPRIVE{" "}
            <span className="dynamic-word-container">
              <TransitionGroup component={null}>
                {letters.map((letter, index) => (
                  <CSSTransition key={index} timeout={500} classNames="letter">
                    <span className="dynamic-letter">{letter}</span>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </span>
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            {/* Use Link with "/#section-id" to navigate back home and scroll */}
            <li>
              <Link
                to="/#features"
                className="page-scroll"
                onClick={() => setServicesDropdownOpen(false)}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/#about"
                className="page-scroll"
                onClick={() => setServicesDropdownOpen(false)}
              >
                About
              </Link>
            </li>

            {/* Mega Dropdown Toggle */}
            <li className={`dropdown mega-dropdown ${servicesDropdownOpen ? "open" : ""}`}>
              <a
                href="#!"
                className="dropdown-toggle page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  setServicesDropdownOpen(!servicesDropdownOpen);
                }}
              >
                Services <span className="caret"></span>
              </a>
              {servicesDropdownOpen && (
                <div className="dropdown-menu mega-menu-content row">
                  {servicesData && servicesData.map((category, idx) => (
                    <div className="col-sm-3 mega-menu-category" key={idx}>
                      <h4><i className={category.icon}></i> {category.mainCategory}</h4>
                      <ul className="list-unstyled">
                        {category.subCategories.map((sub, sIdx) => (
                          <li key={sIdx}>
                            <Link to={sub.route} onClick={() => setServicesDropdownOpen(false)}>
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link
                to="/#portfolio"
                className="page-scroll"
                onClick={() => setServicesDropdownOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/#blog"
                className="page-scroll"
                onClick={() => setServicesDropdownOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/#testimonials"
                className="page-scroll"
                onClick={() => setServicesDropdownOpen(false)}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="/#team"
                className="page-scroll"
                onClick={() => setServicesDropdownOpen(false)}
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="/#contact"
                className="page-scroll"
                onClick={() => setServicesDropdownOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
