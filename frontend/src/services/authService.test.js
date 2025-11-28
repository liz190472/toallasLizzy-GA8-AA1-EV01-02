import authService from './authService';

// Mock de fetch global
global.fetch = jest.fn();

describe('authService - Login', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('CP-001: Login exitoso con credenciales válidas', async () => {
    // Arrange: Preparar respuesta simulada
    const mockResponse = {
      success: true,
      data: {
        token: 'mock-token-123',
        user: { email: 'test@test.com', nombre: 'Usuario Test' }
      }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    // Act: Ejecutar login
    const result = await authService.login('test@test.com', 'password');

    // Assert: Verificar resultados
    expect(fetch).toHaveBeenCalledWith('http://localhost:8001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com', password: 'password' })
    });
    expect(result.success).toBe(true);
    expect(result.data.token).toBe('mock-token-123');
  });

  test('CP-002: Login con credenciales incorrectas', async () => {
    // Arrange
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Credenciales incorrectas' })
    });

    // Act & Assert
    await expect(authService.login('wrong@test.com', 'wrong')).rejects.toThrow();
  });

  test('CP-003: Login con campos vacíos', async () => {
    // Arrange & Act & Assert
    await expect(authService.login('', '')).rejects.toThrow();
  });
});
