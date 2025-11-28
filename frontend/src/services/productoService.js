const API_URL = 'http://localhost:8001/api';

const productoService = {
  getProductos: async () => {
    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener productos');
      }

      return data;
    } catch (error) {
      console.error('Error en getProductos:', error);
      throw error;
    }
  },

  crearProducto: async (formData) => {
    console.log('Creando producto con los siguientes datos:');
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear producto');
      }

      return data;
    } catch (error) {
      console.error('Error en crearProducto:', error);
      throw error;
    }
  },

  actualizarProducto: async (id, formData) => {
    try {
      formData.append('_method', 'PUT');

      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar producto');
      }

      return data;
    } catch (error) {
      console.error('Error en actualizarProducto:', error);
      throw error;
    }
  },

  eliminarProducto: async (id) => {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar producto');
      }

      return data;
    } catch (error) {
      console.error('Error en eliminarProducto:', error);
      throw error;
    }
  }
};

export default productoService;