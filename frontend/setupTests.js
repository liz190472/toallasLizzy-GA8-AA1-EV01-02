import '@testing-library/jest-dom';

// Configuración global de console para pruebas
global.console = {
  ...console,
  // Descomenta para silenciar logs específicos durante las pruebas
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Mock global de fetch para peticiones HTTP
global.fetch = jest.fn();

// Mock de matchMedia para componentes responsive
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});