import React, { useEffect } from "react";
import { Header } from "../components/header";
import { Features } from "../components/features";
import { About } from "../components/about";
import { Services } from "../components/services";
import { Testimonials } from "../components/testimonials";
import { Team } from "../components/Team";
import { Contact } from "../components/contact";
import { Blog } from "../components/blog";
import Whatsapp from "../components/Whatsapp";
import { useLocation } from "react-router-dom";

export const Home = ({ landingPageData }) => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        // Smooth scrolling to the element
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Scroll to the top if no hash is present
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Header data={landingPageData?.Header} />
      <Features data={landingPageData?.Features} />
      <About data={landingPageData?.About} />
      <Services data={landingPageData?.Services} />
      <Blog data={landingPageData?.Blog} />
      <Testimonials data={landingPageData?.Testimonials} />
      <Team data={landingPageData?.Team} />
      <Contact data={landingPageData?.Contact} />

      {/* WhatsApp Floating Button */}
      <Whatsapp />
    </>
  );
};
