// src/Components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img className="LogoHeader" src="https://raw.githubusercontent.com/Feru34/ComiAndes/main/public/3.png?token=GHSAT0AAAAAACURFNFBN73OPN6GV4CPGWHAZUTN6IQ" alt="Logo" />
        <nav>
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