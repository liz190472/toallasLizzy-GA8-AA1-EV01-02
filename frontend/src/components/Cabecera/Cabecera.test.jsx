import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cabecera from './Cabecera';

describe('Componente Cabecera', () => {
  beforeEach(() => {
    render(<Cabecera />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('renderiza el título "Toallas Lizzy" correctamente', () => {
    const tituloElement = screen.getByText(/Toallas Lizzy/i);
    expect(tituloElement).toBeInTheDocument();
    expect(tituloElement.tagName).toBe('H1');
  });

  test('renderiza un elemento h1', () => {
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).toBeInTheDocument();
  });

  test('el h1 contiene el texto correcto', () => {
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).toHaveTextContent('Toallas Lizzy');
  });
});
