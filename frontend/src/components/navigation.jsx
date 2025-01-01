import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link, useLocation } from "react-router-dom";
import "./navigation.css"; // Ensure CSS is correctly imported

export const Navigation = ({ servicesData, jurisdictionsData }) => {
  const location = useLocation();
  const { pathname, hash } = location;

  // Helper function to check if a main link is active
  const isActiveLink = (linkPath, isHash = false, hashLink = "") => {
    if (isHash) {
      return pathname === "/" && hash === hashLink;
    }
    return pathname.startsWith(linkPath);
  };

  const words = ["Services", "Consulting", "Commercial"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words[currentWordIndex];
  const letters = currentWord.split("");

  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [juridictionsDropdownOpen, setJuridictionsDropdownOpen] = useState(false);
  const [openServicesIndex, setOpenServicesIndex] = useState(null);
  const [freezoneOpenIndex, setFreezoneOpenIndex] = useState(null);
  const navRef = useRef(null);

  const handleServicesHover = (index) => {
    setOpenServicesIndex(openServicesIndex === index ? null : index);
  };

  const handleFreezoneHover = (index) => {
    setFreezoneOpenIndex(freezoneOpenIndex === index ? null : index);
  };

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
        setJuridictionsDropdownOpen(false);
        setFreezoneOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              setJuridictionsDropdownOpen(false);
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
            <li className={isActiveLink("/", true, "#about") ? "active" : ""}>
              <Link
                to="/#about"
                className="page-scroll"
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setJuridictionsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                }}
              >
                About Us
              </Link>
            </li>

            {/* Jurisdictions Dropdown */}
            <li
              className={`dropdown ${
                juridictionsDropdownOpen ? "open" : ""
              } ${isActiveLink("/jurisdictions") ? "active" : ""}`}
            >
              <a
                href="#!"
                className="dropdown-toggle page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  setJuridictionsDropdownOpen(!juridictionsDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
              >
                Jurisdictions <span className="caret" />
              </a>
              {juridictionsDropdownOpen && (
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
                              setJuridictionsDropdownOpen(false);
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
                                      setJuridictionsDropdownOpen(false);
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
            <li
              className={`dropdown ${
                servicesDropdownOpen ? "open" : ""
              } ${isActiveLink("/services") ? "active" : ""}`}
            >
              <a
                href="#!"
                className="dropdown-toggle page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setJuridictionsDropdownOpen(false);
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
                        className={category.subCategories ? "dropdown-submenu" : ""}
                        onMouseEnter={() => handleServicesHover(idx)}
                        onMouseLeave={() => handleServicesHover(null)}
                      >
                        <Link
                          to={
                            category.subCategories
                              ? "#!"
                              : `/services${category.route}`
                          }
                          onClick={() => {
                            if (category.subCategories) {
                              setOpenServicesIndex(
                                openServicesIndex === idx ? null : idx
                              );
                            } else {
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

                        {/* Nested Sub-Menu for subCategories */}
                        {category.subCategories && openServicesIndex === idx && (
                          <ul className="dropdown-menu sub-menu">
                            {category.subCategories.map((sub, sIdx) => (
                              <li key={sIdx}>
                                <Link
                                  to={`/services${sub.route}`}
                                  onClick={() => {
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
            <li className={isActiveLink("/blog") ? "active" : ""}>
              <Link
                to="/blog/2"
                className="page-scroll"
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setJuridictionsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                }}
              >
                Blogs
              </Link>
            </li>

            {/* Contact */}
            <li className={isActiveLink("/", true, "#contact") ? "active" : ""}>
              <Link
                to="/#contact"
                className="page-scroll"
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setJuridictionsDropdownOpen(false);
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
