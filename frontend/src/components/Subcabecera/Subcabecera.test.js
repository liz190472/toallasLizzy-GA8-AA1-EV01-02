import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Subcabecera from './Subcabecera';

describe('Componente Subcabecera', () => {
  test('renderiza el título recibido como prop', () => {
    render(<Subcabecera titulo="Gestión de Productos" />);
    
    const tituloElement = screen.getByText(/Gestión de Productos/i);
    expect(tituloElement).toBeInTheDocument();
  });

  test('muestra la fecha actual en formato español', () => {
    render(<Subcabecera titulo="Test" />);
    
    // Verifico que aparezca alguna parte de la fecha (el año actual)
    const anioActual = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(anioActual))).toBeInTheDocument();
  });

  test('renderiza dos elementos de texto (fecha y título)', () => {
    render(<Subcabecera titulo="Mi Título" />);
    
    // Verifico que existan exactamente 2 elementos <p>
    const divSubcabecera = screen.getByText(/Mi Título/i).closest('div');
    const parrafos = divSubcabecera.querySelectorAll('p');
    expect(parrafos).toHaveLength(2);
  });

  test('formatea la fecha con día de la semana', () => {
    render(<Subcabecera titulo="Test" />);
    
    // Verifico que aparezca un día de la semana en español
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    const hayDiaSemana = diasSemana.some(dia => 
      screen.queryByText(new RegExp(dia, 'i'))
    );
    
    expect(hayDiaSemana).toBe(true);
  });
});
