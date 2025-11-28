import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PanelLateral from './PanelLateral';

describe('Componente PanelLateral', () => {
  beforeEach(() => {
    render(<PanelLateral />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('renderiza el componente correctamente', () => {
    // Verifico que el contenedor principal existe
    const panel = screen.getByRole('button', { name: /Usuario/i }).closest('div');
    expect(panel).toBeInTheDocument();
  });

  test('renderiza todos los 10 botones del menú y estan presentes', () => {
    // Obtener todos los botones
    const botones = screen.getAllByRole('button');
    const botonUsuario = screen.getByRole('button', { name: /Usuario/i });
    const botonClientes = screen.getByRole('button', { name: /Clientes/i });
    const botonProducto = screen.getByRole('button', { name: /Producto/i });
    const botonInventario = screen.getByRole('button', { name: /Inventario/i });
    const botonVentas = screen.getByRole('button', { name: /Ventas/i });
    const botonPedidos = screen.getByRole('button', { name: /Pedidos/i });
    const botonCompras = screen.getByRole('button', { name: /Compras/i });
    const botonFacturacion = screen.getByRole('button', { name: /Facturación/i });
    const botonProveedores = screen.getByRole('button', { name: /Proveedores/i });
    const botonReportes = screen.getByRole('button', { name: /Reportes/i });

// Validamos la cantidad de botones y su presencia
    expect(botones).toHaveLength(10);
    expect(botonUsuario).toBeInTheDocument();
    expect(botonClientes).toBeInTheDocument();
    expect(botonProducto).toBeInTheDocument();
    expect(botonInventario).toBeInTheDocument();
    expect(botonVentas).toBeInTheDocument();
    expect(botonPedidos).toBeInTheDocument();
    expect(botonCompras).toBeInTheDocument();
    expect(botonFacturacion).toBeInTheDocument();
    expect(botonProveedores).toBeInTheDocument();
    expect(botonReportes).toBeInTheDocument();
  });
});
