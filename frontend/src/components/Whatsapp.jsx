import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./Whatsapp.css";

const Whatsapp = () => {
  return (
    <div className="whatsapp-float">
      <a
        href="https://wa.me/+971568140925"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>
    </div>
  );
};

export default Whatsapp;
