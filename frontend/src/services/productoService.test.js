import productoService from './productoService';

// Mock de fetch global
global.fetch = jest.fn();

describe('productoService - CRUD Productos', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('CP-004: Listar productos existentes', async () => {
    // Arrange: Preparar respuesta simulada
    const mockProductos = [
      { id: 1, nombre: 'Toalla Infantil', precio: 15000, stock: 50 },
      { id: 2, nombre: 'Toalla Hotelera', precio: 25000, stock: 30 }
    ];
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProductos
    });

    // Act: Ejecutar getProductos
    const result = await productoService.getProductos();

    // Assert: Verificar resultados
    expect(fetch).toHaveBeenCalledWith('http://localhost:8001/api/productos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    expect(result).toEqual(mockProductos);
    expect(result.length).toBe(2);
  });

  test('CP-005: Crear nuevo producto exitosamente', async () => {
    // Arrange: Preparar datos del nuevo producto
    const formData = new FormData();
    formData.append('nombre', 'Toalla Premium');
    formData.append('precio', '35000');
    formData.append('stock', '20');

    const mockRespuesta = {
      message: 'Producto creado exitosamente',
      producto: { id: 3, nombre: 'Toalla Premium', precio: 35000, stock: 20 }
    };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRespuesta
    });

    // Act: Ejecutar crearProducto
    const result = await productoService.crearProducto(formData);

    // Assert: Verificar resultados
    expect(fetch).toHaveBeenCalledWith('http://localhost:8001/api/productos', {
      method: 'POST',
      body: formData
    });
    expect(result.message).toBe('Producto creado exitosamente');
    expect(result.producto.nombre).toBe('Toalla Premium');
    expect(result.producto.precio).toBe(35000);
  });

  test('CP-006: Actualizar producto existente', async () => {
    // Arrange: Preparar datos actualizados
    const formData = new FormData();
    formData.append('nombre', 'Toalla Infantil Actualizada');
    formData.append('precio', '18000');
    formData.append('stock', '45');

    const mockRespuesta = {
      message: 'Producto actualizado exitosamente',
      producto: { id: 1, nombre: 'Toalla Infantil Actualizada', precio: 18000, stock: 45 }
    };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRespuesta
    });

    // Act: Ejecutar actualizarProducto
    const result = await productoService.actualizarProducto(1, formData);

    // Assert: Verificar resultados
    expect(formData.get('_method')).toBe('PUT');
    expect(fetch).toHaveBeenCalledWith('http://localhost:8001/api/productos/1', {
      method: 'POST',
      body: formData
    });
    expect(result.message).toBe('Producto actualizado exitosamente');
    expect(result.producto.nombre).toBe('Toalla Infantil Actualizada');
    expect(result.producto.precio).toBe(18000);
  });

  test('CP-007: Eliminar producto de la base de datos', async () => {
    // Arrange: Preparar respuesta de eliminación
    const mockRespuesta = {
      message: 'Producto eliminado exitosamente'
    };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRespuesta
    });

    // Act: Ejecutar eliminarProducto
    const result = await productoService.eliminarProducto(1);

    // Assert: Verificar resultados
    expect(fetch).toHaveBeenCalledWith('http://localhost:8001/api/productos/1', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    expect(result.message).toBe('Producto eliminado exitosamente');
  });
});
