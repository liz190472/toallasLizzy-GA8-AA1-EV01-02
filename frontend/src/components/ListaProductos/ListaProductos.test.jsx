import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListaProductos from './ListaProductos';
import productoService from '../../services/productoService';

// Mock del servicio de productos
jest.mock('../../services/productoService');

describe('Componente ListaProductos', () => {
  const productosEjemplo = [
    {
      id: 1,
      ean_producto: '7503347654238',
      Referencia: 'ToallaDecorativa',
      PrecioUnitario: '75000',
      imagen: null
    },
    {
      id: 2,
      ean_producto: '7503347655547',
      Referencia: 'LimpioDeCocina',
      PrecioUnitario: '25000',
      imagen: null
    }
  ];

  beforeEach(() => {
    // Reset del mock antes de cada test
    jest.clearAllMocks();
  });

  test('renderiza el título "Lista de productos"', async () => {
    productoService.getProductos.mockResolvedValue(productosEjemplo);
    
    render(<ListaProductos onLogout={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('Lista de productos')).toBeInTheDocument();
    });
  });

  test('renderiza la tabla correctamente', async () => {
    productoService.getProductos.mockResolvedValue(productosEjemplo);
    
    render(<ListaProductos onLogout={() => {}} />);
    
    await waitFor(() => {
      const tabla = screen.getByRole('table');
      expect(tabla).toBeInTheDocument();
    });
  });

  test('muestra los encabezados de la tabla', async () => {
    productoService.getProductos.mockResolvedValue(productosEjemplo);
    
    render(<ListaProductos onLogout={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('Imagen')).toBeInTheDocument();
      expect(screen.getByText('EAN')).toBeInTheDocument();
      expect(screen.getByText('Referencia')).toBeInTheDocument();
      expect(screen.getByText('Precio Unitario')).toBeInTheDocument();
    });
  });

  test('renderiza los productos recibidos del servicio', async () => {
    productoService.getProductos.mockResolvedValue(productosEjemplo);
    
    render(<ListaProductos onLogout={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('7503347654238')).toBeInTheDocument();
      expect(screen.getByText('ToallaDecorativa')).toBeInTheDocument();
      expect(screen.getByText(/75.000/)).toBeInTheDocument();
    });
  });

  test('muestra el segundo producto correctamente', async () => {
    productoService.getProductos.mockResolvedValue(productosEjemplo);
    
    render(<ListaProductos onLogout={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('7503347655547')).toBeInTheDocument();
      expect(screen.getByText('LimpioDeCocina')).toBeInTheDocument();
      expect(screen.getByText(/25.000/)).toBeInTheDocument();
    });
  });

  test('muestra mensaje de carga inicialmente', () => {
    productoService.getProductos.mockResolvedValue(productosEjemplo);
    
    render(<ListaProductos onLogout={() => {}} />);
    
    expect(screen.getByText('Cargando productos...')).toBeInTheDocument();
  });

  test('muestra mensaje cuando no hay productos disponibles', async () => {
    productoService.getProductos.mockResolvedValue([]);
    
    render(<ListaProductos onLogout={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('No hay productos disponibles')).toBeInTheDocument();
    });
  });

  test('renderiza el número correcto de filas cuando recibe 2 productos', async () => {
    productoService.getProductos.mockResolvedValue(productosEjemplo);
    
    render(<ListaProductos onLogout={() => {}} />);
    
    await waitFor(() => {
      const filas = screen.getAllByRole('row');
      // 1 fila de encabezado + 2 filas de productos = 3 filas totales
      expect(filas).toHaveLength(3);
    });
  });

  test('muestra texto "Sin imagen" cuando no hay imagen', async () => {
    productoService.getProductos.mockResolvedValue(productosEjemplo);
    
    render(<ListaProductos onLogout={() => {}} />);
    
    await waitFor(() => {
      const sinImagen = screen.getAllByText('Sin imagen');
      expect(sinImagen.length).toBeGreaterThan(0);
    });
  });
});
