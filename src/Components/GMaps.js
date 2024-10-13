import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Estilo del contenedor del mapa
const containerStyle = {
  width: '100%',
  height: '400px',
};

// Coordenadas del centro del mapa (por ejemplo, Bogotá, Colombia)
const center = {
  lat: 4.711,
  lng: -74.0721,
};

function App() {
  return (
    <LoadScript googleMapsApiKey="TU_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Añadir un marcador en el centro */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default App;
