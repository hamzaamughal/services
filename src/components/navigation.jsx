import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import "./navigation.css"; // You can still keep a separate CSS file if you prefer

export const Navigation = ({ servicesData, jurisdictionsData }) => {
  const words = ["Services", "Consulting", "Commercial"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words[currentWordIndex];
  const letters = currentWord.split("");

  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [judicementsDropdownOpen, setJudicementsDropdownOpen] = useState(false);

  // Track which main service index is open/hovered
const [openServicesIndex, setOpenServicesIndex] = useState(null);

// Toggle hover (similar to handleFreezoneHover)
const handleServicesHover = (index) => {
  setOpenServicesIndex(openServicesIndex === index ? null : index);
};

  // For nested (freezone) dropdown in "Jurisdictions":
  const [freezoneOpenIndex, setFreezoneOpenIndex] = useState(null);

  const navRef = useRef(null);

  // Rotate the word every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [words.length]);

  // Close dropdowns if clicked outside
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

  // Toggle sub-menu (freezone) on hover or click
  const handleFreezoneHover = (index) => {
    setFreezoneOpenIndex(freezoneOpenIndex === index ? null : index);
  };

  return (
    <nav
      id="menu"
      className="navbar navbar-default navbar-fixed-top"
      ref={navRef}
    >
      <div className="container conatiner_Box">
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
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>

          {/* Dynamic Branding */}
          <Link
            to="/"
            className="navbar-brand page-scroll"
            style={{ color: "#4169e1" }}
          >
            <span className="mpriveColor">MPRIVE </span>
            {""}
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
            {/* About Us */}
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

            {/* Jurisdictions Dropdown */}
            <li className={`dropdown ${judicementsDropdownOpen ? "open" : ""}`}>
              <a
                href="#!"
                className="dropdown-toggle page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  setJudicementsDropdownOpen(!judicementsDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
              >
                Jurisdictions <span className="caret" />
              </a>
              {judicementsDropdownOpen && (
                <ul className="dropdown-menu">
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
                              ? "#!"
                              : `/jurisdictions${jurisdiction.route}`
                          }
                          onClick={() => {
                            // On click, toggle or navigate
                            if (jurisdiction.subServices) {
                              setFreezoneOpenIndex(
                                freezoneOpenIndex === idx ? null : idx
                              );
                            } else {
                              setJudicementsDropdownOpen(false);
                              setServicesDropdownOpen(false);
                            }
                          }}
                        >
                          <i className={jurisdiction.icon} /> {jurisdiction.name}
                          {jurisdiction.subServices && (
                            <span className="arrow-right" />
                          )}
                        </Link>

                        {/* Sub-menu (if subServices exist) */}
                        {jurisdiction.subServices &&
                          freezoneOpenIndex === idx && (
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
                                    <i className={sub.icon} /> {sub.name}
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

            {/* Services Dropdown (Simple Dropdown) */}
            <li className={`dropdown ${servicesDropdownOpen ? "open" : ""}`}>
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
    Services <span className="caret" />
  </a>

  {servicesDropdownOpen && (
    <ul className="dropdown-menu">
      {servicesData &&
        servicesData.map((category, idx) => (
          <li
            key={idx}
            // If this category has subCategories, apply 'dropdown-submenu'
            className={category.subCategories ? "dropdown-submenu" : ""}
            // On hover, toggle which index is open
            onMouseEnter={() => handleServicesHover(idx)}
            onMouseLeave={() => handleServicesHover(null)}
          >
            <Link
              to={category.subCategories ? "#!" : category.route}
              onClick={() => {
                // If subCategories exist, don't navigate immediately
                if (category.subCategories) {
                  setOpenServicesIndex(
                    openServicesIndex === idx ? null : idx
                  );
                } else {
                  // If no subCategories, navigate away
                  setServicesDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                }
              }}
            >
              {/* Optional icon */}
              {category.icon && <i className={category.icon} />}{" "}
              {category.mainCategory}

              {/* Display arrow if subCategories exist */}
              {category.subCategories && (
                <span className="arrow-right" />
              )}
            </Link>

            {/* Nested Sub-Menu if subCategories exist and hovered index matches */}
            {category.subCategories && openServicesIndex === idx && (
              <ul className="dropdown-menu sub-menu">
                {category.subCategories.map((sub, sIdx) => (
                  <li key={sIdx}>
                    <Link
                      to={sub.route}
                      onClick={() => {
                        // Close dropdown after navigating
                        setServicesDropdownOpen(false);
                        setFreezoneOpenIndex(null);
                        setOpenServicesIndex(null);
                      }}
                    >
                      {sub.icon && <i className={sub.icon} />} {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
    </ul>
  )}
</li>

            {/* Blogs */}
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

            {/* Contact */}
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