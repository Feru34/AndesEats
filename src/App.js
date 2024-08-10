import React, { useRef, useState, useEffect } from 'react';
import Header from './Components/header';
import Mapa from './Components/Mapa'

import './App.css';

function App() {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  

  return (
    <div>
      <Header setFilteredRestaurants={setFilteredRestaurants} />
      <Mapa lugares={filteredRestaurants}/>
    </div>
  );
}

export default App;
