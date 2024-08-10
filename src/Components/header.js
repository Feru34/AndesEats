import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../3.png';
import jsonData from '../data/lugares.json'; // Asegúrate de tener tu JSON en la carpeta src y renómbralo

const Header = ({ setFilteredRestaurants }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Muestra todos los datos sin filtros cuando la página se carga por primera vez
    setFilteredRestaurants(jsonData);
  }, [setFilteredRestaurants]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Funciones de filtrado
  const filterByVegetariano = () => {
    const filtered = jsonData.filter(item => item.menu_vegetariano === "Si");
    setFilteredRestaurants(filtered);
  };

  const filterByDomicilios = () => {
    const filtered = jsonData.filter(item => item.domicilios === "Si");
    setFilteredRestaurants(filtered);
  };

  const filterByTarjeta = () => {
    const filtered = jsonData.filter(item => item.tarjeta === "Si");
    setFilteredRestaurants(filtered);
  };

  const resetFilters = () => {
    // Restablece los datos sin filtros al hacer clic en el logo
    setFilteredRestaurants(jsonData);
  };

  return (
    <header className="header">
      <div className="header-content">
        <img className="LogoHeader" src={logo} alt="Logo" onClick={resetFilters} />
        <button className="hamburger-menu" onClick={toggleMenu}>
          &#9776;
        </button>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <button className="nav-link" onClick={filterByVegetariano}>Vegetariano</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={filterByDomicilios}>Domicilios</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={filterByTarjeta}>Tarjeta</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
