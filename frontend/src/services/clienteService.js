const API_URL = 'http://localhost:8001/api';

const clienteService = {
  getClientes: async () => {
    try {
      const response = await fetch(`${API_URL}/clientes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener clientes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  crearCliente: async (cliente) => {
    try {
      const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) {
        throw new Error('Error al crear cliente');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  actualizarCliente: async (id, cliente) => {
    try {
      const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar cliente');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  eliminarCliente: async (id) => {
    try {
      const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar cliente');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export default clienteService;