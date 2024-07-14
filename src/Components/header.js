// src/Components/Header.js
import React, { useState } from 'react';
import './Header.css';
import logo from '../3.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <img className="LogoHeader" src={logo} alt="Logo" />
        <button className="hamburger-menu" onClick={toggleMenu}>
          &#9776;
        </button>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><a href="#about">Vegetariano</a></li>
            <li className="nav-item"><a href="#services">Almuerzos</a></li>
            <li className="nav-item"><a href="#contact">Meriendas</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
