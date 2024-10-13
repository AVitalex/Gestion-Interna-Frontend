import React, { useState, useEffect } from 'react';
import './Reclamos.css';
import Sidebar from './Sidebar';
import { fetchTipoReclamos, fetchReclamos, createReclamo  } from './api';
import FilterBar from './FilterBar';
import DetalleReclamo from './DetalleReclamo';

const Reclamos = () => {
  const [activeTab, setActiveTab] = useState('Mis reclamos');
  const [listaRec, setListaRec] = useState([]); // Estado para guardar los tipos de reclamos
  const [listaRecUs, setListaRecUs] = useState([]); // Estado para guardar los reclamos
  const [filteredReclamos, setFilteredReclamos] = useState([]); // Estado para guardar los reclamos filtrados

  const [tipoReclamo, setTipoReclamo] = useState(null);
  const [comentario, setInconveniente] = useState('');
  const [premisa, setPremisa] = useState('');
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tipoReclamos = await fetchTipoReclamos();
      const reclamos = await fetchReclamos();
      setListaRec(tipoReclamos);
      setListaRecUs(reclamos);
      setTipoReclamo(listaRec[0]);
      setFilteredReclamos(reclamos); // Inicializar los reclamos filtrados con todos los reclamos
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm, fechaDesde, fechaHasta, tipoReclamo) => {
    const filteredReclamos = listaRecUs.filter((reclamo) => {
      const fechaDesdeFilter = fechaDesde ? new Date(fechaDesde) : null;
      const fechaHastaFilter = fechaHasta ? new Date(fechaHasta) : null;
      const tipoReclamoFilter = tipoReclamo ? tipoReclamo : '';

      return (
        (searchTerm ? reclamo.id.toString().includes(searchTerm) : true) &&
        (fechaDesdeFilter ? new Date(reclamo.fecha) >= fechaDesdeFilter : true) &&
        (fechaHastaFilter ? new Date(reclamo.fecha) <= fechaHastaFilter : true) &&
        (tipoReclamoFilter ? reclamo.tipoReclamo.nombre.includes(tipoReclamoFilter) : true)
      );
    });
    setFilteredReclamos(filteredReclamos);
  };

  const handleClaimClick = (claim) => {
    const updatedClaims = filteredReclamos.map((item) => {
      if (item.id === claim.id) {
        return { ...item, showDetails: !item.showDetails };
      }
      return item;
    });
    setFilteredReclamos(updatedClaims);
  };

  const handleFormSubmit = async () => {
    try {
      const reclamoData = { tipoReclamo, comentario, premisa};
      alert(`Sending reclamo data: ${JSON.stringify(reclamoData)}`);
      const response = await createReclamo(reclamoData);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <div className="content-container">
          <div className="header">RECLAMOS</div>
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'Mis reclamos' ? 'active' : ''}`}
              onClick={() => handleTabClick('Mis reclamos')}
            >
              Mis reclamos
            </div>
            <div
              className={`tab ${activeTab === 'Realizar reclamo' ? 'active' : ''}`}
              onClick={() => handleTabClick('Realizar reclamo')}
            >
              Realizar reclamo
            </div>
          </div>
          {activeTab === 'Mis reclamos' ? (
            <div className="content">
              <FilterBar onSearch={handleSearch} listaRec={listaRec} />
              {filteredReclamos.length > 0 ? (
                filteredReclamos.map((item) => (
                  <div key={item.id} className="claim">
                    <div>
                      <strong>Nro de reclamo:</strong> {item.id}
                      <strong style={{ marginLeft: '20px' }}>
                        Fecha de creacion:
                      </strong>{' '}
                      {item.fecha}
                    </div>
                    <div>
                      <strong>Tipo de reclamo:</strong> {item.tipoReclamo.nombre}
                    </div>
                    <button className="claim-link" onClick={() => handleClaimClick(item)}>
                      Ver detalles
                    </button>
                    {item.showDetails && <DetalleReclamo reclamo={item} />}
                  </div>
                ))
              ) : (
                <div className="claim">
                  <div>
                    No se encontró el reclamo
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rr-container">
              <div className="rr-form-group">
                <label htmlFor="tipo-reclamo">Tipo de reclamo</label>
                <select
                  id="tipo-reclamo"
                  value={tipoReclamo ? tipoReclamo.nombre : ''} // Use nombre for display
                  onChange={(e) => {
                    const selectedTipo = listaRec.find(item => item.nombre === e.target.value);
                    setTipoReclamo(selectedTipo); // Set the full object
                  }}
                >
                  {listaRec.length > 0 ? (
                    listaRec.map((item) => (
                      <option key={item.id} value={item.nombre}>
                        {item.nombre}
                      </option>
                    ))
                  ) : (
                    <option value="">Cargando tipos de reclamos...</option>
                  )}
                </select>
              </div>
              <div className="rr-form-group">
                <label htmlFor="inconveniente">Asunto:</label>
                <textarea id="premisa" value={premisa} onChange={(e) => setPremisa(e.target.value)} />
              </div>
              <div className="rr-form-group">
                <label htmlFor="inconveniente">Indique su inconveniente:</label>
                <textarea id="inconveniente" value={comentario} onChange={(e) => setInconveniente(e.target.value)} />
              </div>
              <div className="rr-form-group">
                <button onClick={handleFormSubmit}>Enviar reclamo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reclamos;
