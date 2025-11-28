import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormularioProducto from './FormularioProducto';

describe('Componente FormularioProducto', () => {
  const mockOnGuardar = jest.fn();
  const mockOnCancelar = jest.fn();

  beforeEach(() => {
    render(<FormularioProducto onGuardar={mockOnGuardar} onCancelar={mockOnCancelar} />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('renderiza el formulario en modo creación', () => {

    const titulo = screen.getByText(/Crear Producto/i);
    expect(titulo).toBeInTheDocument();
  });

  test('renderiza todos los campos del formulario', () => {

    expect(screen.getByPlaceholderText(/Código EAN/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Referencia del producto/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Peso en gramos/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tamaño del producto/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Color del producto/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Precio del producto/i)).toBeInTheDocument();
  });

  test('permite ingresar texto en los campos', () => {

    const inputEan = screen.getByPlaceholderText(/Código EAN/i);
    fireEvent.change(inputEan, { target: { value: '123456789' } });

    expect(inputEan.value).toBe('123456789');
  });

  test('ejecuta onCancelar al hacer clic en CANCELAR', () => {

    const botonCancelar = screen.getByText(/CANCELAR/i);
    fireEvent.click(botonCancelar);

    expect(mockOnCancelar).toHaveBeenCalledTimes(1);
  });
});
