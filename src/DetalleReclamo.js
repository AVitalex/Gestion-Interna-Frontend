// DetalleReclamo.js
import React from 'react';
import './DetalleReclamo.css'

const DetalleReclamo = ({ reclamo }) => {
  return (
    <div className="reclamo-details">
      <h2>Detalles del reclamo</h2>
      <div className="reclamo-info">
        <div className="info-row">
          <strong>Estado:</strong>
          <span>{reclamo.estado}</span>
        </div>
        <div className="info-row">
          <strong>Descripción del reclamo:</strong>
          <span>{reclamo.tipoReclamo.descripcion}</span>
        </div>
        <div className="info-row">
          <strong>Comentario:</strong>
          <span>{reclamo.comentario}</span>
        </div>
        
      </div>
    </div>
  );
};

export default DetalleReclamo;