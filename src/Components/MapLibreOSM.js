import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import LugarDetail from './LugarDetail'; 
import markerImg from '../marker.png';


const MapLibreOSM = ({ lugares, filtroTipoComida }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  const [activePoint, setActivePoint] = useState(null);

  const osmStyle = {
    version: 8,
    sources: {
      'osm-raster-tiles': {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    },
    layers: [{
      id: 'osm-tiles',
      type: 'raster',
      source: 'osm-raster-tiles',
      minzoom: 0,
      maxzoom: 22
    }]
  };

  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: osmStyle,
        center: [-74.0660, 4.6030],
        zoom: 17
      });

      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
      map.current.addControl(new maplibregl.AttributionControl(), 'bottom-right');

      return () => map.current?.remove();
    }
  }, []);

  useEffect(() => {
    if (map.current && Array.isArray(lugares) && lugares.length > 0) {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      const lugaresFiltrados = filtroTipoComida
        ? lugares.filter(l => l.tipoComida === filtroTipoComida)
        : lugares;

      lugaresFiltrados.forEach(lugar => {
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <img src="${markerImg}" alt="Marcador" style="width: 30px; cursor: pointer;" />
        `;


        const marker = new maplibregl.Marker({
          element: markerElement,
          anchor: 'bottom'
        })
          .setLngLat([lugar.pos.longitude, lugar.pos.latitude])
          .addTo(map.current);

        markerElement.addEventListener('click', () => {
          setActivePoint({
            ID: lugar.id,
            Nombre: lugar.nombre,
            Direccion: lugar.direccion || 'Dirección no disponible',
            Descripcion: lugar.descripcion || '',
            Contacto: lugar.contacto || 'No definido',
            Precio: lugar.precio || 'No definido',
            Rating: lugar.rating || 0,
            Domicilios: lugar.domicilios || false,
            MenuVegetariano: lugar.menuVegetariano || false,
            Descuento: lugar.descuento || false,
            Tiquetera: lugar.tiquetera || false,
            HoraApertura: lugar.horaApertura || 'No definido',
            HoraCierre: lugar.horaCierre || 'No definido',
          });

          flyToLocation(lugar.pos.longitude, lugar.pos.latitude);
        });

        markers.current.push(marker);
      });
    }
  }, [lugares, filtroTipoComida]);

  const flyToLocation = (lng, lat) => {
    map.current.flyTo({
      center: [lng, lat],
      zoom: 17,
      essential: true
    });
  };

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
      {activePoint && (
        <LugarDetail
          {...activePoint}
          SetActivePoint={() => setActivePoint(null)}
        />
      )}
    </>
  );
};

export default MapLibreOSM;
