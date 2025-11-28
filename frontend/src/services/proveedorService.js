const API_URL = 'http://localhost:8001/api';

const proveedorService = {
  getProveedores: async () => {
    try {
      const response = await fetch(`${API_URL}/proveedores`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener proveedores');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  crearProveedor: async (proveedor) => {
    try {
      const response = await fetch(`${API_URL}/proveedores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proveedor),
      });

      if (!response.ok) {
        throw new Error('Error al crear proveedor');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  actualizarProveedor: async (id, proveedor) => {
    try {
      const response = await fetch(`${API_URL}/proveedores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proveedor),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar proveedor');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  eliminarProveedor: async (id) => {
    try {
      const response = await fetch(`${API_URL}/proveedores/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar proveedor');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export default proveedorService;