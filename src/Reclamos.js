import React, { useState, useEffect } from 'react';
import './Reclamos.css';
import Sidebar from './Sidebar';
import { fetchTipoReclamos, fetchReclamos, fetchPedidoReclamos, createReclamo, createTipoReclamo, modificarReclamo } from './api';
import FilterBar from './FilterBar';
import DetalleReclamo from './DetalleReclamo';

const Reclamos = () => {
  const [activeTab, setActiveTab] = useState('Mis reclamos');
  const [listaRec, setListaRec] = useState([]); // Estado para guardar los tipos de reclamos
  const [pedidoReclamos, setListaPedRec] = useState([]); // Estado para guardar todos los pedidos de los reclamos
  const [listaRecUs, setListaRecUs] = useState([]); // Estado para guardar los reclamos
  const [filteredReclamos, setFilteredReclamos] = useState([]); // Estado para guardar los reclamos filtrados
  const [tipoReclamo, setTipoReclamo] = useState(null);
  const [comentario, setInconveniente] = useState('');
  const [premisa, setPremisa] = useState('');

  const [dropdownVisible, setDropdownVisible] = useState(null); // Track which dropdown is open
  const [selectedStatus, setSelectedStatus] = useState({}); // Track selected status for each claim
  
  const [newTipoReclamo, setNewTipoReclamo] = useState(''); // State for new claim type name
  const [newCategoria, setNewCategoria] = useState(''); // State to track the category of the new claim type
  const [newDescripcion, setNewDescripcion] = useState(''); // State to track the description of the new claim type



  useEffect(() => {
    const fetchData = async () => {
      const tipoReclamos = await fetchTipoReclamos();
      const pedidoReclamos = await fetchPedidoReclamos();
      const reclamos = await fetchReclamos();
      setListaRec(tipoReclamos);
      setListaPedRec(pedidoReclamos);
      setListaRecUs(reclamos);
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


  const handleStatusChange = async (claimId, newStatus) => {
    const reclamoData = { idReclamo: claimId, estado: newStatus };
    try {
      const response = await modificarReclamo(reclamoData);
      if (response.ok) {
        alert(`Claim ${claimId} status changed to "${newStatus}" successfully!`);
        const updatedClaims = filteredReclamos.map((item) =>
          item.id === claimId ? { ...item, status: newStatus } : item
        );
        setFilteredReclamos(updatedClaims);
        setDropdownVisible(null); // Close the dropdown
      } else {
        alert("Failed to change status. Please try again.");
      }
    } catch (error) {
      console.error("Error modifying claim status:", error);
      alert("An error occurred while changing the status. Please try again.");
    }
  };


  const toggleDropdown = (claimId) => {
    setDropdownVisible((prev) => (prev === claimId ? null : claimId)); // Toggle visibility for the specific claim
  };

  const handleStatusSelect = (claimId, status) => {
    setSelectedStatus((prev) => ({ ...prev, [claimId]: status })); // Update selected status for the specific claim
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

  const handleCrearTipoReclamo = async (event) => {
    event.preventDefault(); // Prevent form submission refresh

    if (!newTipoReclamo.trim()) {
      alert("El nombre del tipo de reclamo no puede estar vacío");
      return;
    }

    // Prepare the data to send to the API
    const reclamoData = { nombre: newTipoReclamo, categoria: newCategoria, descripcion: newDescripcion};

    try {
      // Call the createTipoReclamo function from api.js
      const response = await createTipoReclamo(reclamoData);

      // Handle response
      if (response.ok) {
        const data = await response.json();
        console.log('Nuevo tipo de reclamo creado:', data);
        alert('Tipo de reclamo creado exitosamente');
        setNewTipoReclamo(''); // Reset input field after successful creation
      } else {
        alert('Hubo un error al crear el tipo de reclamo');
      }
    } catch (error) {
      console.error('Error creating tipo reclamo:', error);
      alert('Hubo un error al crear el tipo de reclamo');
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
              onClick={() => setActiveTab('Mis reclamos')}
            >
              Reclamos
            </div>
            <div
              className={`tab ${activeTab === 'Realizar reclamo' ? 'active' : ''}`}
              onClick={() => setActiveTab('Realizar reclamo')}
            >
              Realizar reclamo
            </div>
            <div
              className={`tab ${activeTab === 'Crear tipo reclamo' ? 'active' : ''}`}
              onClick={() => setActiveTab('Crear tipo reclamo')}
            >
              Crear tipo reclamo
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
                      <strong style={{ marginLeft: '20px' }}>
                        Usuario:
                      </strong>{' '}
                      {item.cliente}
                    </div>
                    <div>
                      <strong>Tipo de reclamo:</strong> {item.tipoReclamo.nombre}
                    </div>
                    <button className="claim-link" onClick={() => handleClaimClick(item)}>
                      Ver detalles
                    </button>
                    <button
                      className="claim-response"
                      onClick={() => toggleDropdown(item.id)}
                    >
                      Responder Reclamo
                    </button>
                    {item.showDetails && (
                      <div>
                      <DetalleReclamo reclamo={item} />
                      {pedidoReclamos.filter((pedido) => pedido.idPedido === item.pedido).length > 0  && item.pedido !==0 ?(
                        <div className="pedidos">
                          <h4>Pedidos Asociados:</h4>
                          <div>
                            {pedidoReclamos
                              .filter((pedido) => pedido.idPedido === item.pedido)
                              .map((pedido) => (
                                <div key={pedido.idPedido} className="pedido-item">
                                  <p ><strong>ID Pedido:</strong> {pedido.idPedido}</p>
                                  <p><strong>Nombre Usuario:</strong> {pedido.nombreUsuario}</p>
                                  <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString()}</p>
                                  <p><strong>Monto Total:</strong> ${pedido.montoTotal.toFixed(2)}</p>
                                  <p><strong>Cantidad de Productos:</strong> {pedido.cantidadDeProductos}</p>
                                  <p><strong>Productos:</strong></p>
                                  <div style={{ marginLeft: '20px' }}>
                                    {pedido.productos.map((producto, index) => (
                                      <p key={index}>{producto}</p>
                                    ))}
                                  </div>
                            <p><strong>Estado:</strong> {pedido.estado}</p>
                          </div>
                          ))}
                          </div>
                          </div>
                        ) : (
                          <p>No hay pedidos asociados a este reclamo.</p>
                        )}
                      </div>
                    )}
                    {dropdownVisible === item.id && (
                      <div className="dropdown">
                        <select
                          value={selectedStatus[item.id] || ''}
                          onChange={(e) => handleStatusSelect(item.id, e.target.value)}
                        >
                          <option value="">Seleccione un estado</option>
                          <option value="ABIERTO">ABIERTO</option>
                          <option value="CERRADO">CERRADO</option>
                          <option value="ESPERANDO_RESPUESTA">ESPERANDO_RESPUESTA</option>
                        </select>
                        <button
                          onClick={() =>
                            handleStatusChange(item.id, selectedStatus[item.id])
                          }
                          disabled={!selectedStatus[item.id]} // Disable if no status is selected
                        >
                          Confirmar
                        </button>
                      </div>
                    )}
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
          ) :
          activeTab === 'Realizar reclamo' ? (
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
          ) : 
          activeTab === 'Crear tipo reclamo' ? (
            <div className="rr-container">
              <div className="rr-form-group">
                <label htmlFor="tipo-reclamo">Nuevo tipo de reclamo</label>
                <input
                  type="text"
                  id="tipo-reclamo"
                  value={newTipoReclamo}
                  onChange={(e) => setNewTipoReclamo(e.target.value)} // Handle input change
                  placeholder="Escribe el nombre del nuevo tipo de reclamo"
                  required
                />
              </div>
              <div className="rr-form-group">
                <label htmlFor="categoria-reclamo">Categoría</label>
                <select
                  id="categoria-reclamo"
                  value={newCategoria}
                  onChange={(e) => setNewCategoria(e.target.value)} // Handle category selection
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Gestion Financiera">Gestion Financiera</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Usuarios">Usuarios</option>
                </select>
              </div>

              <div className="rr-form-group">
                <label htmlFor="descripcion-reclamo">Descripción</label>
                <textarea
                  id="descripcion-reclamo"
                  value={newDescripcion}
                  onChange={(e) => setNewDescripcion(e.target.value)} // Handle description input change
                  placeholder="Escribe una descripción del tipo de reclamo"
                  required
                />
              </div>

              <div className="rr-form-group">
                <button onClick={handleCrearTipoReclamo}>Crear tipo reclamo</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Reclamos;
