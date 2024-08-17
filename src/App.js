import React, { useRef, useState, useEffect } from 'react';
import Header from './Components/header';
import Mapa from './Components/Mapa'

import './App.css';
import Footer from './Components/Footer';

function App() {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  

  return (
    <div>
      <Header setFilteredRestaurants={setFilteredRestaurants} />
      <Mapa lugares={filteredRestaurants}/>
      <Footer />
    </div>
  );
}

export default App;
