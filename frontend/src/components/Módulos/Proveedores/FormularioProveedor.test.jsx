import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormularioProveedor from './FormularioProveedor';

describe('Componente FormularioProveedor', () => {
  const mockOnGuardar = jest.fn();
  const mockOnCancelar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el formulario en modo creación con todos los campos', () => {
    render(<FormularioProveedor onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    expect(screen.getByRole('heading', { name: /Crear Proveedor/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/NIT del proveedor/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre de la empresa/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email del proveedor/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Número de teléfono/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /CREAR/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /CANCELAR/i })).toBeInTheDocument();
  });

  test('renderiza el formulario en modo edición con datos precargados', () => {
    const proveedorMock = {
      nit: '900123456-7',
      nombre: 'Distribuidora XYZ',
      correo_electronico: 'contacto@xyz.com',
      numero_telefono: '6011234567'
    };

    render(
      <FormularioProveedor 
        proveedor={proveedorMock} 
        onGuardar={mockOnGuardar} 
        onCancelar={mockOnCancelar} 
      />
    );

    expect(screen.getByRole('heading', { name: /Editar Proveedor/i })).toBeInTheDocument();

    expect(screen.getByDisplayValue('900123456-7')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Distribuidora XYZ')).toBeInTheDocument();
    expect(screen.getByDisplayValue('contacto@xyz.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('6011234567')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /EDITAR/i })).toBeInTheDocument();
  });

  test('permite ingresar texto en todos los campos del formulario', () => {
    render(<FormularioProveedor onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    const inputNit = screen.getByPlaceholderText(/NIT del proveedor/i);
    const inputNombre = screen.getByPlaceholderText(/Nombre de la empresa/i);
    const inputEmail = screen.getByPlaceholderText(/Email del proveedor/i);
    const inputTelefono = screen.getByPlaceholderText(/Número de teléfono/i);

    fireEvent.change(inputNit, { target: { value: '800987654-3' } });
    fireEvent.change(inputNombre, { target: { value: 'Proveedor ABC' } });
    fireEvent.change(inputEmail, { target: { value: 'info@abc.com' } });
    fireEvent.change(inputTelefono, { target: { value: '3001112233' } });

    expect(inputNit.value).toBe('800987654-3');
    expect(inputNombre.value).toBe('Proveedor ABC');
    expect(inputEmail.value).toBe('info@abc.com');
    expect(inputTelefono.value).toBe('3001112233');
  });

  test('muestra alerta cuando faltan campos obligatorios al enviar', () => {
    window.alert = jest.fn();
    render(<FormularioProveedor onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    const form = screen.getByRole('button', { name: /CREAR/i }).closest('form');
    fireEvent.submit(form);

    expect(window.alert).toHaveBeenCalledWith('Error: Por favor complete los campos obligatorios (NIT, Nombre y Email)');
    expect(mockOnGuardar).not.toHaveBeenCalled();
  });

  test('ejecuta onGuardar con datos completos al enviar el formulario', () => {
    render(<FormularioProveedor onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    fireEvent.change(screen.getByPlaceholderText(/NIT del proveedor/i), { 
      target: { value: '900111222-3' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/Nombre de la empresa/i), { 
      target: { value: 'Proveedor Nacional' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/Email del proveedor/i), { 
      target: { value: 'ventas@nacional.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/Número de teléfono/i), { 
      target: { value: '6019998877' } 
    });

    const form = screen.getByRole('button', { name: /CREAR/i }).closest('form');
    fireEvent.submit(form);

    expect(mockOnGuardar).toHaveBeenCalledWith({
      nit: '900111222-3',
      nombre: 'Proveedor Nacional',
      correo_electronico: 'ventas@nacional.com',
      numero_telefono: '6019998877'
    });
  });

  test('ejecuta onCancelar al hacer clic en CANCELAR', () => {
    render(<FormularioProveedor onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    const botonCancelar = screen.getByRole('button', { name: /CANCELAR/i });
    fireEvent.click(botonCancelar);

    expect(mockOnCancelar).toHaveBeenCalledTimes(1);
  });
});
