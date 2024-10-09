import React, { useState } from 'react';
import './Reclamos.css';
import Sidebar from './Sidebar';

const Reclamos = () => {
  const [activeTab, setActiveTab] = useState('Mis reclamos');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <div className="content-container">
          <div className="header">RECLAMOS</div>
          <div className="tabs">
            <div className={`tab ${activeTab === 'Mis reclamos' ? 'active' : ''}`} onClick={() => handleTabClick('Mis reclamos')}>Mis reclamos</div>
            <div className={`tab ${activeTab === 'Realizar reclamo' ? 'active' : ''}`} onClick={() => handleTabClick('Realizar reclamo')}>Realizar reclamo</div>
          </div>
          {activeTab === 'Mis reclamos' ? (
            <div className="content">
              <div className="filter">
                <div>
                  <label>Filtrar por:</label>
                  <label>Fecha desde:</label>
                  <input type="date" />
                  <label>Fecha hasta:</label>
                  <input type="date" />
                  <i className="fas fa-search"></i>
                </div>
                <div>
                  <label>Nro de reclamo:</label>
                  <input type="text" value="000001" />
                  <label>Tipo de reclamo:</label>
                  <select>
                    <option value="">Seleccione</option>
                  </select>
                </div>
              </div>
              <div className="claim">
                <div>
                  <strong>Nro de reclamo:</strong> 000001
                  <strong style={{ marginLeft: '20px' }}>Fecha de creacion:</strong> 23/09/2024
                </div>
                <div>
                  <strong>Tipo de reclamo:</strong> Pedido de reembolso
                </div>
              </div>
            </div>
          ) : (
            <div className="rr-container">
              <div className="rr-form-group">
                <label for="tipo-reclamo">Tipo de reclamo</label>
                <select id="tipo-reclamo">
                  <option>Pedido de reembolso</option>
                </select>
              </div>
              <div className="rr-form-group">
                <label for="inconveniente">Indique su inconveniente:</label>
                <textarea id="inconveniente">
                  Lorem ipsum dolor amet, consectetur adipiscing elit. Commodo eros, aenean curae sapien proin maecenas sapien diam. Est ad class montes enim blandit aliquet du dapibus. Torquent venenatis viverra neque; donec habitasse ultrices sed massa ante. Praesent consectetur morbi dapibus sit sodales posuere. Morbi cursus lapius ipsum sagittis leo velit dolor neque. Tincidunt erat non ipsum amet sapien libero dui sed potenti. Platea ante tellus imperdiet, accumsan consequat tempor vitae.
                </textarea>
              </div>
              <div className="rr-form-group">
                <label for="adjuntar-imagenes">Adjuntar imágenes</label>
                <input type="text" id="adjuntar-imagenes" value="Img01.png"/>
                <input type="text" id="adjuntar-imagenes" value="Img02.png"/>
              </div>
              <div className="rr-form-group">
                <button>Enviar reclamo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reclamos;