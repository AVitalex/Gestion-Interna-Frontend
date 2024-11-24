const API_URL = 'http://52.21.190.163:8080';

const fetchTipoReclamos = async () => {
  try {
    const response = await fetch(`${API_URL}/tipoReclamos/listar`);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  } catch (error) {
    console.error('Hubo un error:', error);
    return [];
  }
};

const fetchReclamos = async () => {
  try {
    const response = await fetch(`${API_URL}/reclamos/listar`);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  } catch (error) {
    console.error('Hubo un error:', error);
    return [];
  }
};

const fetchPedidoReclamos = async () => {
  try {
    const response = await fetch(`${API_URL}/pedidos/listar`);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  } catch (error) {
    console.error('Hubo un error:', error);
    return [];
  }
};

const createReclamo = async (reclamoData) => {
  try {
    
    const response = await fetch(`${API_URL}/reclamos/crear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reclamoData),
    });
    console.log(reclamoData)
    return response;
  } catch (error) {
    throw error;
  }
};

const createTipoReclamo = async (reclamoData) => {
  try {
    
    const response = await fetch(`${API_URL}/tipoReclamos/crear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reclamoData),
    });
    console.log(reclamoData)
    return response;
  } catch (error) {
    throw error;
  }
};

const modificarReclamo = async (reclamoData) => {
  try {
    const response = await fetch(`${API_URL}/reclamos/cambiarEstado/${reclamoData.estado}/${reclamoData.idReclamo}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reclamoData),
    });
    console.log(reclamoData)
    return response;
  } catch (error) {
    throw error;
  }
};


export { fetchTipoReclamos, fetchReclamos, fetchPedidoReclamos, createReclamo, createTipoReclamo, modificarReclamo };