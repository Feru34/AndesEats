// src/Components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img className="LogoHeader" src="../../public/2.png" />
      <div className="header-content">
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
