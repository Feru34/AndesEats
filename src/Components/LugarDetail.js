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
        <h3 className="ubicacion">Ubicación: {props.Direccion}</h3>
        <p className="description">{props.Descripcion}</p>
        <p><strong>Contacto:</strong> {props.Telefono}</p>
        <p><strong>Precio Menú del Día:</strong> {props.PrecioMenuDia}</p>
        {props.PrecioDesayunos && <p><strong>Precio Desayunos:</strong> {props.PrecioDesayunos}</p>}

        <div className="tags">
          {props.Domicilios === 'Si' && <span className="tag">Domicilios</span>}
          {props.MenuVegetariano === 'Si' && <span className="tag">Menú Vegetariano</span>}
          {props.Tarjeta === 'Si' && <span className="tag">Reciben Tarjeta</span>}
        </div>
        <button className="close-btn" onClick={() => props.SetActivePoint(null)}>Cerrar</button>
      </div>
    </div>
  );
};

export default LugarDetail;
