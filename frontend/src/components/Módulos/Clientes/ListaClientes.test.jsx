import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListaClientes from './ListaClientes';
import clienteService from '../../../services/clienteService';

jest.mock('../../../services/clienteService');
jest.mock('../../Subcabecera/Subcabecera', () => {
  return function Subcabecera({ titulo }) {
    return <div data-testid="subcabecera">{titulo}</div>;
  };
});
jest.mock('./FormularioCliente', () => {
  return function FormularioCliente({ onCancelar }) {
    return <div data-testid="formulario-cliente">
      <button onClick={onCancelar}>CANCELAR MOCK</button>
    </div>;
  };
});

describe('Componente ListaClientes', () => {
  const mockOnLogout = jest.fn();
  const clientesMock = [
    { id: 1, nombre: 'Juan Pérez', cedula: '123456', telefono: '3001234567' },
    { id: 2, nombre: 'María López', cedula: '789012', telefono: '3109876543' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
  });

  test('renderiza la lista de clientes correctamente', async () => {
    clienteService.getClientes.mockResolvedValue(clientesMock);
    render(<ListaClientes onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/LISTADO CLIENTES/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });

    expect(screen.getByText('María López')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
    expect(screen.getByText('3001234567')).toBeInTheDocument();
  });

  test('muestra mensaje de cargando mientras obtiene datos', () => {
    clienteService.getClientes.mockImplementation(() => new Promise(() => {}));
    render(<ListaClientes onLogout={mockOnLogout} />);

    expect(screen.getByText(/Cargando clientes.../i)).toBeInTheDocument();
  });

  test('muestra mensaje cuando no hay clientes disponibles', async () => {
    clienteService.getClientes.mockResolvedValue([]);
    render(<ListaClientes onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/No hay clientes disponibles/i)).toBeInTheDocument();
    });
  });

  test('cambia a vista de creación al hacer clic en CREAR', async () => {
    clienteService.getClientes.mockResolvedValue(clientesMock);
    render(<ListaClientes onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/LISTADO CLIENTES/i)).toBeInTheDocument();
    });

    const botonCrear = screen.getByRole('button', { name: /CREAR/i });
    fireEvent.click(botonCrear);

    expect(screen.getByTestId('formulario-cliente')).toBeInTheDocument();
    expect(screen.getByText(/Crear Clientes/i)).toBeInTheDocument();
  });

  test('cambia a vista de edición al hacer clic en Editar', async () => {
    clienteService.getClientes.mockResolvedValue(clientesMock);
    render(<ListaClientes onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });

    const botonesEditar = screen.getAllByRole('button', { name: /Editar/i });
    fireEvent.click(botonesEditar[0]);

    expect(screen.getByTestId('formulario-cliente')).toBeInTheDocument();
    expect(screen.getByText(/Editar Cliente/i)).toBeInTheDocument();
  });

  test('regresa a vista lista al cancelar desde formulario', async () => {
    clienteService.getClientes.mockResolvedValue(clientesMock);
    render(<ListaClientes onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/LISTADO CLIENTES/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /CREAR/i }));
    
    await waitFor(() => {
      expect(screen.getByTestId('formulario-cliente')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/CANCELAR MOCK/i));

    await waitFor(() => {
      expect(screen.getByText(/LISTADO CLIENTES/i)).toBeInTheDocument();
    });
  });

  test('ejecuta onLogout al hacer clic en Cerrar sesión', async () => {
    clienteService.getClientes.mockResolvedValue(clientesMock);
    render(<ListaClientes onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/LISTADO CLIENTES/i)).toBeInTheDocument();
    });

    const botonCerrarSesion = screen.getByRole('button', { name: /Cerrar sesión/i });
    fireEvent.click(botonCerrarSesion);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  test('elimina un cliente al confirmar eliminación', async () => {
    clienteService.getClientes.mockResolvedValue(clientesMock);
    clienteService.eliminarCliente.mockResolvedValue({});
    render(<ListaClientes onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });

    const botonesEliminar = screen.getAllByRole('button', { name: /Eliminar/i });
    fireEvent.click(botonesEliminar[0]);

    await waitFor(() => {
      expect(clienteService.eliminarCliente).toHaveBeenCalledWith(1);
    });
  });

  test('muestra alerta de error cuando falla la carga de clientes', async () => {
    clienteService.getClientes.mockRejectedValue(new Error('Error de red'));
    render(<ListaClientes onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/Error al cargar clientes: Error de red/i)).toBeInTheDocument();
    });
  });
});
