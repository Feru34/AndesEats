import React, { useEffect, useState } from 'react';
import Header from './Components/Header'; 
import Mapa from './Components/Mapa';
import Auth from './Components/Auth';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail'); // Verificamos si hay un email guardado
    if (email) {
      setIsLoggedIn(true); // Si hay email, el usuario está logueado
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Header setFilteredRestaurants={setFilteredRestaurants} />
          <Mapa lugares={filteredRestaurants} />
        </div>  
      ) : (
        <Auth onLogin={handleLogin} /> 
      )}
    </div>
  );
}

export default App;
