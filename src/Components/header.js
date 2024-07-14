// src/Components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>ComiAndes</h1>
        <nav>
          <ul className="nav-list">
            <li className="nav-item"><a href="#home">Todo</a></li>
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
