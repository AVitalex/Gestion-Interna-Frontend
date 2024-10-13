import React, { useState } from 'react';

const FilterBar = ({ onSearch, listaRec }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [tipoReclamo, setTipoReclamo] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm, fechaDesde, fechaHasta, tipoReclamo);
  };

  return (
    <div className="filter">
      <button style={{ marginRight: '10px' }}  onClick={handleSearch}>Filtrar</button>
      <div>
        <label>Nro de reclamo:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
        />
      </div>
      <div>
        <label>Fecha desde:</label>
        <input
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
        />
        <label>Fecha hasta:</label>
        <input
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
        />
      </div>
      <div>
        <label>Tipo de reclamo:</label>
        <select
          id="tipo-reclamo"
          value={tipoReclamo}
          onChange={(e) => setTipoReclamo(e.target.value)}
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
    </div>
  );
};

export default FilterBar;