const API_URL = 'http://localhost:8080';

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

const createReclamo = async (reclamoData) => {
  try {
    const response = await fetch(`${API_URL}/reclamos/crear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reclamoData),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export { fetchTipoReclamos, fetchReclamos, createReclamo };