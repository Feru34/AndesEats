import React from 'react';
import './LugarDetail.css';

// Componente para renderizar estrellas
const Stars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="star filled">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="star">&#9733;</span>);
    }
  }
  return <div className="rating">{stars}</div>;
};

const LugarDetail = (props) => {
  return (
    <div className="overlay">
      <div className="info-box">
        <h1>{props.Nombre}</h1>
        <Stars rating={props.Rating} />
        <h3 className="ubicacion">{props.Direccion}</h3>
        <p className="description">{props.Descripcion}</p>
        <p><strong>Contacto:</strong> {props.Contacto}</p>
        <p><strong>Precio:</strong> {props.Precio}</p>

        <div className="tags">
          {props.Domicilios && <span className="tag">Domicilios</span>}
          {props.MenuVegetariano && <span className="tag">Menú Vegetariano</span>}
          {props.Descuento && <span className="tag">Descuentos con ticketeras</span>}
        </div>
        <button className="close-btn" onClick={() => props.SetActivePoint(null)}>Cerrar</button>
      </div>
    </div>
  );
};

export default LugarDetail;
