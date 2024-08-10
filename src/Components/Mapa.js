import React, { useRef, useState, useEffect } from 'react';
import Mapa from '../mapa.png';
import LugarDetail from './LugarDetail';
import './Mapa.css';
import lugares from '../data/lugares.json'; // Importa el JSON

const IMapa = () => {
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState(false);
  const [pointX, setPointX] = useState(0);
  const [pointY, setPointY] = useState(0);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [activePoint, setActivePoint] = useState(null);

  const zoomRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const zoom = zoomRef.current;
    const container = containerRef.current;
    const img = imgRef.current;
    if (!zoom || !container || !img) return;

    let lastDistance = 0;

    const setTransform = () => {
      zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    };

    const getPositionFromEvent = (e) => {
      if (e.touches && e.touches.length) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    };

    const limitPan = (newX, newY, newScale) => {
      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      const maxX = Math.max(0, (imgRect.width * newScale - containerRect.width) / 2);
      const maxY = Math.max(0, (imgRect.height * newScale - containerRect.height) / 2);

      return {
        x: Math.min(Math.max(newX, -maxX), maxX),
        y: Math.min(Math.max(newY, -maxY), maxY)
      };
    };

    const handleStartPan = (e) => {
      if (e.target.classList.contains('point')) return; // Evita iniciar pan al hacer clic en un punto
      e.preventDefault();
      const position = getPositionFromEvent(e);
      setStart({ x: position.x - pointX, y: position.y - pointY });
      setPanning(true);
      if (e.touches && e.touches.length === 2) {
        lastDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleEndPan = () => {
      setPanning(false);
    };

    const handlePan = (e) => {
      if (!panning) return;
      e.preventDefault();
      
      if (e.touches && e.touches.length === 2) {
        // Pinch zoom
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = distance / lastDistance;
        lastDistance = distance;
        
        const newScale = Math.min(Math.max(scale * delta, 1), 5);
        setScale(newScale);
        
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const rect = container.getBoundingClientRect();
        const newPosition = limitPan(
          midX - rect.left - ((midX - rect.left - pointX) * newScale / scale),
          midY - rect.top - ((midY - rect.top - pointY) * newScale / scale),
          newScale
        );
        setPointX(newPosition.x);
        setPointY(newPosition.y);
      } else {
        // Pan
        const position = getPositionFromEvent(e);
        const newPosition = limitPan(position.x - start.x, position.y - start.y, scale);
        setPointX(newPosition.x);
        setPointY(newPosition.y);
      }
      setTransform();
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const position = { x: e.clientX, y: e.clientY };
      const xs = (position.x - rect.left - pointX) / scale;
      const ys = (position.y - rect.top - pointY) / scale;
      const delta = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      
      const newScale = Math.min(Math.max(scale * delta, 1), 5);
      setScale(newScale);
      
      const newPosition = limitPan(
        position.x - rect.left - xs * newScale,
        position.y - rect.top - ys * newScale,
        newScale
      );
      setPointX(newPosition.x);
      setPointY(newPosition.y);
      setTransform();
    };

    zoom.addEventListener('mousedown', handleStartPan, { passive: false });
    zoom.addEventListener('touchstart', handleStartPan, { passive: false });
    window.addEventListener('mouseup', handleEndPan);
    window.addEventListener('touchend', handleEndPan);
    window.addEventListener('mousemove', handlePan, { passive: false });
    window.addEventListener('touchmove', handlePan, { passive: false });
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      zoom.removeEventListener('mousedown', handleStartPan);
      zoom.removeEventListener('touchstart', handleStartPan);
      window.removeEventListener('mouseup', handleEndPan);
      window.removeEventListener('touchend', handleEndPan);
      window.removeEventListener('mousemove', handlePan);
      window.removeEventListener('touchmove', handlePan);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scale, panning, pointX, pointY, start]);

  const handlePointClick = (lugar) => {
    setActivePoint(lugar);
  };

  return (
    <div>
      <div className="zoom_outer" ref={containerRef}>
        <div id="zoom" ref={zoomRef} style={{ transform: `translate(${pointX}px, ${pointY}px) scale(${scale})` }}>
          <img ref={imgRef} src={Mapa} alt="zoom" />
          {lugares.map((lugar, index) => (
            <div
              key={index}
              className="point"
              style={{
                left: `${lugar.coordenadas.x}%`,
                top: `${lugar.coordenadas.y}%`,
                transform: `scale(${1 / scale})`
              }}
              onClick={() => handlePointClick(lugar)}
              onTouchStart={() => handlePointClick(lugar)} // Añadir evento onTouchStart
            />
          ))}
        </div>
      </div>
      {activePoint && (
        <LugarDetail  
          SetActivePoint={setActivePoint}
          Nombre={activePoint.nombre}
          Rating={4.5} // Supongamos que esto viene de alguna otra fuente o cálculo
          Direccion={activePoint.direccion}
          Telefono={activePoint.telefono}
          PrecioMenuDia={activePoint.precio_menu_dia}
          PrecioDesayunos={activePoint.precio_desayunos}
          Domicilios={activePoint.domicilios}
          MenuVegetariano={activePoint.menu_vegetariano}
          Tarjeta={activePoint.tarjeta}
          Descripcion={activePoint.descripcion}
          Coordenadas={activePoint.coordenadas}
        />
      )}
    </div>
  );
};

export default IMapa;
