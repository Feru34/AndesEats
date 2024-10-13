import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../3.png';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Header = ({ setFilteredRestaurants }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const db = getFirestore();
      const restaurantesCollection = collection(db, 'Restaurante');
      const restaurantesSnapshot = await getDocs(restaurantesCollection);
      const restaurantesList = restaurantesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRestaurants(restaurantesList);
      setFilteredRestaurants(restaurantesList);
    };

    fetchRestaurants();

    const email = localStorage.getItem('userEmail'); // Obtener el correo del usuario
    if (email) {
      setUserEmail(email);
    }
  }, [setFilteredRestaurants]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Eliminar el email del localStorage
    window.location.reload(); // Recargar la página para volver al estado inicial
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Funciones de filtrado que cierran el menú
  const filterByVegetariano = () => {
    const filtered = restaurants.filter(item => item.menu_vegetariano === true);
    setFilteredRestaurants(filtered);
    closeMenu();
  };

  const filterByDomicilios = () => {
    const filtered = restaurants.filter(item => item.domicilios === true);
    setFilteredRestaurants(filtered);
    closeMenu();
  };

  const filterByDescuento = () => {
    const filtered = restaurants.filter(item => item.ticketera === true);
    setFilteredRestaurants(filtered);
    closeMenu();
  };

  const resetFilters = () => {
    setFilteredRestaurants(restaurants);
    closeMenu();
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <button className="hamburger-menu" onClick={toggleMenu}>
            &#9776;
          </button>
          <div className="logo-container" onClick={resetFilters}>
            <img className="LogoHeader" src={logo} alt="Logo" />
          </div>
        </div>
      </header>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={closeMenu}>×</button>
        <ul className="nav-list">
          <li className="nav-item">
            <button className="nav-link" onClick={filterByVegetariano}>Vegetariano</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={filterByDomicilios}>Domicilios</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={filterByDescuento}>Descuentos</button>
          </li>
          <li className="nav-item">
            <button className="nav-link reset-button" onClick={resetFilters}>Quitar Filtros</button>
          </li>
        </ul>
        <div className="profile-section">
          <p className="user-email">{userEmail}</p>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
