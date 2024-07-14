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
        <h3 className="ubicacion" >Dirección: {props.Ubicacion}</h3>
        <p className="description">{props.Descripcion}</p>
        <div className="comments">
            <h3>Comentarios de clientes:</h3>
            <ul className="comment-list">
            {props.Comentarios.map((comentario, index) => (
                <li key={index} className="comment">{comentario}</li>
            ))}
            </ul>
        </div>
        <button className="close-btn" onClick={() => props.SetActivePoint(null)}>Cerrar</button>
        </div>
    </div>
  );
}

export default LugarDetail;
