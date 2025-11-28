import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListaProveedores from './ListaProveedores';
import proveedorService from '../../../services/proveedorService';

jest.mock('../../../services/proveedorService');
jest.mock('../../Subcabecera/Subcabecera', () => {
  return function Subcabecera({ titulo }) {
    return <div data-testid="subcabecera">{titulo}</div>;
  };
});
jest.mock('./FormularioProveedor', () => {
  return function FormularioProveedor({ onCancelar }) {
    return <div data-testid="formulario-proveedor">
      <button onClick={onCancelar}>CANCELAR MOCK</button>
    </div>;
  };
});

describe('Componente ListaProveedores', () => {
  const mockOnLogout = jest.fn();
  const proveedoresMock = [
    { 
      id: 1, 
      nit: '900123456-7', 
      nombre: 'Distribuidora XYZ', 
      correo_electronico: 'contacto@xyz.com',
      numero_telefono: '6011234567'
    },
    { 
      id: 2, 
      nit: '800987654-3', 
      nombre: 'Proveedor ABC', 
      correo_electronico: 'info@abc.com',
      numero_telefono: '3001112233'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
  });

  test('renderiza la lista de proveedores correctamente', async () => {
    proveedorService.getProveedores.mockResolvedValue(proveedoresMock);
    render(<ListaProveedores onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/LISTADO PROVEEDORES/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Distribuidora XYZ')).toBeInTheDocument();
    });

    expect(screen.getByText('Proveedor ABC')).toBeInTheDocument();
    expect(screen.getByText('900123456-7')).toBeInTheDocument();
    expect(screen.getByText('contacto@xyz.com')).toBeInTheDocument();
  });

  test('muestra mensaje de cargando mientras obtiene datos', () => {
    proveedorService.getProveedores.mockImplementation(() => new Promise(() => {}));
    render(<ListaProveedores onLogout={mockOnLogout} />);

    expect(screen.getByText(/Cargando proveedores.../i)).toBeInTheDocument();
  });

  test('muestra mensaje cuando no hay proveedores disponibles', async () => {
    proveedorService.getProveedores.mockResolvedValue([]);
    render(<ListaProveedores onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/No hay proveedores disponibles/i)).toBeInTheDocument();
    });
  });

  test('cambia a vista de creación al hacer clic en CREAR', async () => {
    proveedorService.getProveedores.mockResolvedValue(proveedoresMock);
    render(<ListaProveedores onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/LISTADO PROVEEDORES/i)).toBeInTheDocument();
    });

    const botonCrear = screen.getByRole('button', { name: /CREAR/i });
    fireEvent.click(botonCrear);

    expect(screen.getByTestId('formulario-proveedor')).toBeInTheDocument();
    expect(screen.getByText(/Crear Proveedor/i)).toBeInTheDocument();
  });

  test('cambia a vista de edición al hacer clic en Editar', async () => {
    proveedorService.getProveedores.mockResolvedValue(proveedoresMock);
    render(<ListaProveedores onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText('Distribuidora XYZ')).toBeInTheDocument();
    });

    const botonesEditar = screen.getAllByRole('button', { name: /Editar/i });
    fireEvent.click(botonesEditar[0]);

    expect(screen.getByTestId('formulario-proveedor')).toBeInTheDocument();
    expect(screen.getByText(/Editar Proveedor/i)).toBeInTheDocument();
  });

  test('regresa a vista lista al cancelar desde formulario', async () => {
    proveedorService.getProveedores.mockResolvedValue(proveedoresMock);
    render(<ListaProveedores onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/LISTADO PROVEEDORES/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /CREAR/i }));
    
    await waitFor(() => {
      expect(screen.getByTestId('formulario-proveedor')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/CANCELAR MOCK/i));

    await waitFor(() => {
      expect(screen.getByText(/LISTADO PROVEEDORES/i)).toBeInTheDocument();
    });
  });

  test('ejecuta onLogout al hacer clic en Cerrar sesión', async () => {
    proveedorService.getProveedores.mockResolvedValue(proveedoresMock);
    render(<ListaProveedores onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/LISTADO PROVEEDORES/i)).toBeInTheDocument();
    });

    const botonCerrarSesion = screen.getByRole('button', { name: /Cerrar sesión/i });
    fireEvent.click(botonCerrarSesion);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  test('elimina un proveedor al confirmar eliminación', async () => {
    proveedorService.getProveedores.mockResolvedValue(proveedoresMock);
    proveedorService.eliminarProveedor.mockResolvedValue({});
    render(<ListaProveedores onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText('Distribuidora XYZ')).toBeInTheDocument();
    });

    const botonesEliminar = screen.getAllByRole('button', { name: /Eliminar/i });
    fireEvent.click(botonesEliminar[0]);

    await waitFor(() => {
      expect(proveedorService.eliminarProveedor).toHaveBeenCalledWith(1);
    });
  });

  test('muestra alerta de error cuando falla la carga de proveedores', async () => {
    proveedorService.getProveedores.mockRejectedValue(new Error('Error de conexión'));
    render(<ListaProveedores onLogout={mockOnLogout} />);

    await waitFor(() => {
      expect(screen.getByText(/Error al cargar proveedores: Error de conexión/i)).toBeInTheDocument();
    });
  });
});
