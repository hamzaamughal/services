import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import "./navigation.css"; // Ensure CSS is correctly imported

export const Navigation = ({ servicesData, jurisdictionsData, loginData }) => {
  const location = useLocation();
  const { pathname, hash } = location;

  // Destructure auth values
  const { user, isLoggedIn, logout } = useAuth();

  // Helper function to check if a main link is active
  const isActiveLink = (linkPath, isHash = false, hashLink = "") => {
    if (isHash) {
      return pathname === "/" && hash === hashLink;
    }
    return pathname.startsWith(linkPath);
  };

  // Words for the dynamic brand animation
  const words = ["Services", "Consulting", "Commercial"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words[currentWordIndex];
  const letters = currentWord.split("");

  // Dropdown states
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [juridictionsDropdownOpen, setJuridictionsDropdownOpen] =
    useState(false);
  const [openServicesIndex, setOpenServicesIndex] = useState(null);
  const [freezoneOpenIndex, setFreezoneOpenIndex] = useState(null);

  // Ref for detecting outside clicks
  const navRef = useRef(null);

  // ------------------------------------------
  // 1) Helper: Close the mobile navbar
  // ------------------------------------------
  const closeMobileMenu = () => {
    const collapseElement = document.getElementById(
      "bs-example-navbar-collapse-1"
    );
    if (collapseElement && collapseElement.classList.contains("in")) {
      collapseElement.classList.remove("in");
    }
  };

  // ------------------------------------------
  // 2) Services & Freezone toggles
  // ------------------------------------------
  const handleServicesHover = (index) => {
    setOpenServicesIndex(openServicesIndex === index ? null : index);
  };

  const handleFreezoneHover = (index) => {
    setFreezoneOpenIndex(freezoneOpenIndex === index ? null : index);
  };

  // ------------------------------------------
  // 3) Close dropdowns if clicked outside
  // ------------------------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setServicesDropdownOpen(false);
        setJuridictionsDropdownOpen(false);
        setFreezoneOpenIndex(null);
        setOpenServicesIndex(null);

        // Also close the mobile menu if open
        closeMobileMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------------------------------
  // 4) Rotate the word every 3 seconds
  // ------------------------------------------
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [words.length]);

  // ------------------------------------------
  // 5) Framer Motion variants
  // ------------------------------------------
  // Letter animations
  const letterVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -10, opacity: 0 },
  };

  // Dropdown animations
  const dropdownVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <nav
      id="menu"
      className="navbar navbar-default navbar-fixed-top"
      ref={navRef}
    >
      <div className="container conatiner_Box">
        {/* -------------------------------- */}
        {/* 6) Navbar Header / Brand         */}
        {/* -------------------------------- */}
        <div className="navbar-header">
          {/* Mobile toggle button */}
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            onClick={() => {
              // Reset states when toggling menu
              setServicesDropdownOpen(false);
              setJuridictionsDropdownOpen(false);
              setFreezoneOpenIndex(null);
              setOpenServicesIndex(null);
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
            onClick={() => {
              // Close menu on brand click (mobile)
              closeMobileMenu();
            }}
          >
            <span className="mpriveColor">MPRIVE </span>
            <span className="dynamic-word-container">
              {/* AnimatePresence for letter animations */}
              <AnimatePresence mode="popLayout">
                {letters.map((letter, index) => (
                  <motion.span
                    key={`${currentWordIndex}-${index}-${letter}`}
                    className="dynamic-letter"
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </AnimatePresence>
            </span>
          </Link>
        </div>

        {/* -------------------------------- */}
        {/* 7) Collapse Navbar               */}
        {/* -------------------------------- */}
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
                  setOpenServicesIndex(null);
                  // Close menu on mobile
                  closeMobileMenu();
                }}
              >
                About Us
              </Link>
            </li>

            {/* Jurisdictions Dropdown */}
            <li
              className={`dropdown ${juridictionsDropdownOpen ? "open" : ""} ${isActiveLink("/jurisdictions") ? "active" : ""
                } `}
            >
              <button
                type="button"
                className="dropdown-toggle page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  setJuridictionsDropdownOpen(!juridictionsDropdownOpen);
                  setServicesDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                  setOpenServicesIndex(null);
                }}
              >
                Jurisdictions <span className="caret" />
              </button>
              <AnimatePresence>
                {juridictionsDropdownOpen && (
                  <motion.ul
                    className="dropdown-menu"
                    variants={dropdownVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
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
                          <Link
                            to={
                              jurisdiction.subServices
                                ? "#"
                                : `/jurisdictions${jurisdiction.route}`
                            }
                            onClick={() => {
                              if (jurisdiction.subServices) {
                                setFreezoneOpenIndex(
                                  freezoneOpenIndex === idx ? null : idx
                                );
                              } else {
                                // If it doesn't have subServices, we are navigating
                                setJuridictionsDropdownOpen(false);
                                setServicesDropdownOpen(false);
                                setFreezoneOpenIndex(null);
                                setOpenServicesIndex(null);
                                closeMobileMenu();
                              }
                            }}
                          >
                            {/* Icon for the main jurisdiction */}
                            <i className={jurisdiction.icon} /> {jurisdiction.name}
                            {jurisdiction.subServices && (
                              <span className=" arrow-right" />
                            )}
                          </Link>

                          {/* Sub-menu (if subServices exist) */}
                          <AnimatePresence>
                            {jurisdiction.subServices &&
                              freezoneOpenIndex === idx && (
                                <motion.ul
                                  className="dropdown-menu sub-menu"
                                  variants={dropdownVariants}
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  transition={{ duration: 0.3 }}
                                >
                                  {jurisdiction.subServices.map((sub, sIdx) => (
                                    <li key={sIdx}>
                                      <Link
                                        to={`/jurisdictions${sub.route}`}
                                        onClick={() => {
                                          setJuridictionsDropdownOpen(false);
                                          setServicesDropdownOpen(false);
                                          setFreezoneOpenIndex(null);
                                          setOpenServicesIndex(null);
                                          closeMobileMenu();
                                        }}
                                      >
                                        <i className={sub.icon} /> {sub.name}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                          </AnimatePresence>
                        </li>
                      )
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Services Dropdown (Simple) */}
            <li
              className={`dropdown ${servicesDropdownOpen ? "open" : ""} ${isActiveLink("/services") ? "active" : ""
                }`}
            >
              <button
                type="button"
                className="dropdown-toggle page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setJuridictionsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                  setOpenServicesIndex(null);
                }}
              >
                Services <span className="caret" />
              </button>
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.ul
                    className="dropdown-menu"
                    variants={dropdownVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {servicesData &&
                      servicesData.map((category, idx) => (
                        <li
                          key={idx}
                          className={
                            category.subCategories ? "dropdown-submenu" : ""
                          }
                          onMouseEnter={() => handleServicesHover(idx)}
                          onMouseLeave={() => handleServicesHover(null)}
                        >
                          <Link
                            to={
                              category.subCategories
                                ? "#"
                                : `/services${category.route}`
                            }
                            onClick={() => {
                              if (category.subCategories) {
                                setOpenServicesIndex(
                                  openServicesIndex === idx ? null : idx
                                );
                              } else {
                                setServicesDropdownOpen(false);
                                setJuridictionsDropdownOpen(false);
                                setFreezoneOpenIndex(null);
                                setOpenServicesIndex(null);
                                closeMobileMenu();
                              }
                            }}
                          >
                            {category.icon && <i className={category.icon} />}{" "}
                            {category.mainCategory}
                            {/* Display arrow if subCategories exist */}
                            {category.subCategories && (
                              <span className="arrow-right" />
                            )}
                          </Link>

                          {/* Nested Sub-Menu */}
                          <AnimatePresence>
                            {category.subCategories &&
                              openServicesIndex === idx && (
                                <motion.ul
                                  className="dropdown-menu sub-menu"
                                  variants={dropdownVariants}
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  transition={{ duration: 0.3 }}
                                >
                                  {category.subCategories.map((sub, sIdx) => (
                                    <li key={sIdx}>
                                      <Link
                                        to={`/services${sub.route}`}
                                        onClick={() => {
                                          setServicesDropdownOpen(false);
                                          setJuridictionsDropdownOpen(false);
                                          setFreezoneOpenIndex(null);
                                          setOpenServicesIndex(null);
                                          closeMobileMenu();
                                        }}
                                      >
                                        {sub.icon && <i className={sub.icon} />}{" "}
                                        {sub.name}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                          </AnimatePresence>
                        </li>
                      ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Blogs */}
            <li className={isActiveLink("/blog") ? "active" : ""}>
              <Link
                to="/blog"
                className="page-scroll"
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setJuridictionsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                  setOpenServicesIndex(null);
                  closeMobileMenu();
                }}
              >
                Blogs
              </Link>
            </li>

            {/* Promotions */}
            <li>
              <Link
                to="/promotion"
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setJuridictionsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                  setOpenServicesIndex(null);
                  closeMobileMenu();
                }}
              >
                Promotions
              </Link>
            </li>

            {/* Press Release */}
            <li>
              <Link
                to="/pressrelease"
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setJuridictionsDropdownOpen(false);
                  setFreezoneOpenIndex(null);
                  setOpenServicesIndex(null);
                  closeMobileMenu();
                }}
              >
                Press Release
              </Link>
            </li>

            {/* User / Login / Logout */}
            <li className="dropdown">
              <button
                type="button"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <i
                  className="fa fa-user"
                  style={{ marginRight: "5px", marginTop: "2px" }}
                />
                {isLoggedIn ? user?.name || "User" : ""}
                <span className="caret" />
              </button>

              <ul className="dropdown-menu">
                {!isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/user/login"
                        onClick={() => {
                          closeMobileMenu();
                        }}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        onClick={() => {
                          closeMobileMenu();
                        }}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/"
                        onClick={() => {
                          closeMobileMenu();
                        }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                          closeMobileMenu();
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
