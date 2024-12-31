import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import "./navigation.css";

export const Navigation = ({ servicesData, jurisdictionsData }) => {
  const words = ["Services", "Consulting", "Commercial"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words[currentWordIndex];
  const letters = currentWord.split("");

  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [judicementsDropdownOpen, setJudicementsDropdownOpen] = useState(false);

  // For nested (freezone) dropdown:
  const [freezoneOpenIndex, setFreezoneOpenIndex] = useState(null);

  const navRef = useRef(null);

  // Rotate the word every 3 seconds
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
        setJudicementsDropdownOpen(false);
        setFreezoneOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle sub-menu open/close on hover or click
  const handleFreezoneHover = (index) => {
    // If hovered on the same item, close it; else open that item
    setFreezoneOpenIndex(freezoneOpenIndex === index ? null : index);
  };

  return (
    <nav
      id="menu"
      className="navbar navbar-default navbar-fixed-top"
      ref={navRef}
    >
      <div className="container">
        <div className="navbar-header">
          {/* Mobile toggle button */}
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            onClick={() => {
              setServicesDropdownOpen(false);
              setJudicementsDropdownOpen(false);
              setFreezoneOpenIndex(null);
            }}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          {/* Dynamic Branding */}
          <Link
            to="/"
            className="navbar-brand page-scroll"
            style={{ color: "#4169e1" }}
          >
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

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link
                to="/#about"
                className="page-scroll"
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setJudicementsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                }}
              >
                About Us
              </Link>
            </li>
            <li
              className={`dropdown ${judicementsDropdownOpen ? "open" : ""}`}
            >
              <a
                href="#!"
                className="dropdown-toggle page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  setJudicementsDropdownOpen(!judicementsDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
              >
                Jurisdictions <span className="caret"></span>
              </a>
              {judicementsDropdownOpen && (
                <ul className="dropdown-menu">
                  {/* Map through each jurisdiction */}
                  {jurisdictionsData[0].subCategories.map(
                    (jurisdiction, idx) => (
                      <li
                        key={idx}
                        className={
                          jurisdiction.subServices
                            ? "dropdown-submenu"
                            : undefined
                        }
                        onMouseEnter={() => handleFreezoneHover(idx)}
                        onMouseLeave={() => handleFreezoneHover(null)}
                      >
                        {/* If there are subServices, show arrow */}
                        <Link
                          to={
                            jurisdiction.subServices
                              ? "#!" // prevent immediate route if it has sub-services
                              : `/jurisdictions${jurisdiction.route}`
                          }
                          onClick={() => {
                            // On mobile or direct click, we can toggle open
                            if (jurisdiction.subServices) {
                              // If user clicked a parent item, prevent route
                              setFreezoneOpenIndex(
                                freezoneOpenIndex === idx ? null : idx
                              );
                            } else {
                              // If no subServices, navigate
                              setJudicementsDropdownOpen(false);
                              setServicesDropdownOpen(false);
                            }
                          }}
                        >
                          <i className={jurisdiction.icon}></i>{" "}
                          {jurisdiction.name}
                          {jurisdiction.subServices && (
                            <span className="arrow-right"></span>
                          )}
                        </Link>

                        {/* Sub-menu for Freezone Authorities */}
                        {jurisdiction.subServices && freezoneOpenIndex === idx && (
                          <ul className="dropdown-menu sub-menu">
                            {jurisdiction.subServices.map((sub, sIdx) => (
                              <li key={sIdx}>
                                <Link
                                  to={`/jurisdictions${sub.route}`}
                                  onClick={() => {
                                    setJudicementsDropdownOpen(false);
                                    setServicesDropdownOpen(false);
                                    setFreezoneOpenIndex(null);
                                  }}
                                >
                                  <i className={sub.icon}></i> {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>

            {/* Mega Dropdown Toggle for Services */}
            <li
              className={`dropdown mega-dropdown ${
                servicesDropdownOpen ? "open" : ""
              }`}
            >
              <a
                href="#!"
                className="dropdown-toggle page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setJudicementsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                }}
              >
                Services <span className="caret"></span>
              </a>
              {servicesDropdownOpen && (
                <div className="dropdown-menu mega-menu-content row">
                  {servicesData &&
                    servicesData.map((category, idx) => (
                      <div className="col-sm-3 mega-menu-category" key={idx}>
                        <h4>
                          <i className={category.icon}></i>{" "}
                          {category.mainCategory}
                        </h4>
                        <ul className="list-unstyled">
                          {category.subCategories.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <Link
                                to={sub.route}
                                onClick={() => {
                                  setServicesDropdownOpen(false);
                                  setFreezoneOpenIndex(null);
                                }}
                              >
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
                to="/#blog"
                className="page-scroll"
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setJudicementsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                }}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/#contact"
                className="page-scroll"
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setJudicementsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                }}
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
