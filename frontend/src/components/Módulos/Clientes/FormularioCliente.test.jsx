import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormularioCliente from './FormularioCliente';

describe('Componente FormularioCliente', () => {
  const mockOnGuardar = jest.fn();
  const mockOnCancelar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el formulario en modo creación con todos los campos', () => {
    render(<FormularioCliente onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    expect(screen.getByRole('heading', { name: /Crear Cliente/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Ingrese nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese teléfono/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese cédula/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese área/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese email/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /CREAR/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /CANCELAR/i })).toBeInTheDocument();
  });

  test('renderiza el formulario en modo edición con datos precargados', () => {
    const clienteMock = {
      nombre: 'Juan Pérez',
      telefono: '3001234567',
      cedula: '123456789',
      area: 'Ventas',
      email: 'juan@example.com'
    };

    render(
      <FormularioCliente 
        cliente={clienteMock} 
        onGuardar={mockOnGuardar} 
        onCancelar={mockOnCancelar} 
      />
    );

    expect(screen.getByRole('heading', { name: /Editar Cliente/i })).toBeInTheDocument();

    expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3001234567')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456789')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ventas')).toBeInTheDocument();
    expect(screen.getByDisplayValue('juan@example.com')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /EDITAR/i })).toBeInTheDocument();
  });

  test('permite ingresar texto en todos los campos del formulario', () => {
    render(<FormularioCliente onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    const inputNombre = screen.getByPlaceholderText(/Ingrese nombre/i);
    const inputTelefono = screen.getByPlaceholderText(/Ingrese teléfono/i);
    const inputCedula = screen.getByPlaceholderText(/Ingrese cédula/i);
    const inputEmail = screen.getByPlaceholderText(/Ingrese email/i);

    fireEvent.change(inputNombre, { target: { value: 'María López' } });
    fireEvent.change(inputTelefono, { target: { value: '3109876543' } });
    fireEvent.change(inputCedula, { target: { value: '987654321' } });
    fireEvent.change(inputEmail, { target: { value: 'maria@test.com' } });

    expect(inputNombre.value).toBe('María López');
    expect(inputTelefono.value).toBe('3109876543');
    expect(inputCedula.value).toBe('987654321');
    expect(inputEmail.value).toBe('maria@test.com');
  });

  test('muestra alerta cuando faltan campos obligatorios al enviar', () => {
    window.alert = jest.fn();
    render(<FormularioCliente onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    const form = screen.getByRole('button', { name: /CREAR/i }).closest('form');
    fireEvent.submit(form);

    expect(window.alert).toHaveBeenCalledWith('Error: Por favor complete los campos obligatorios');
    expect(mockOnGuardar).not.toHaveBeenCalled();
  });

  test('ejecuta onGuardar con datos completos al enviar el formulario', () => {
    render(<FormularioCliente onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    fireEvent.change(screen.getByPlaceholderText(/Ingrese nombre/i), { 
      target: { value: 'Carlos Ruiz' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese teléfono/i), { 
      target: { value: '3201234567' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese cédula/i), { 
      target: { value: '111222333' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese email/i), { 
      target: { value: 'carlos@test.com' } 
    });

    const form = screen.getByRole('button', { name: /CREAR/i }).closest('form');
    fireEvent.submit(form);

    expect(mockOnGuardar).toHaveBeenCalledWith({
      nombre: 'Carlos Ruiz',
      telefono: '3201234567',
      cedula: '111222333',
      area: '',
      email: 'carlos@test.com'
    });
  });

  test('ejecuta onCancelar al hacer clic en CANCELAR', () => {
    render(<FormularioCliente onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);

    const botonCancelar = screen.getByRole('button', { name: /CANCELAR/i });
    fireEvent.click(botonCancelar);

    expect(mockOnCancelar).toHaveBeenCalledTimes(1);
  });
});
