import React from "react";
import "./Footer.css";

const Footer = () => {
  const handleClick = () => {
    window.open("https://tu-link-al-formulario.com", "_blank");
  };

  return (
    <footer className="footer">
      <button className="add-restaurant-button" onClick={handleClick}>
      ¿Te gustaría agregar otro restaurante?
      </button>
    </footer>
  );
};

export default Footer;
