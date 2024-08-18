import React, { useRef, useState, useEffect } from 'react';
import Header from './Components/header';
import Mapa from './Components/Mapa'

import './App.css';
import Footer from './Components/Footer';

function App() {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  

  return (
    <div>
      <Header setFilteredRestaurants={setFilteredRestaurants} />
      <Mapa lugares={filteredRestaurants} onClickMapa={closeMenu}/>
      <Footer />
    </div>
  );
}

export default App;
