// validarUsuario.test.js
import { supabase } from "./client.js";
import { validarUsuario } from "./nativeQuerys.js";

// Encadenamiento de funciones para simular el comportamiento de Supabase
jest.mock("./client.js", () => {
  // Se define una función base que devolverá el mock final en cada paso
  const mockChain = {
    from: jest.fn(() => mockChain),
    select: jest.fn(() => mockChain),
    eq: jest.fn(() => mockChain),
    single: jest.fn(),
  };

  return { supabase: mockChain };
});

describe('validarUsuario (nativeQuerys)', () => {

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    contrasena: 'securepassword'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('debe retornar usuario cuando las credenciales son válidas', async () => {
    supabase.single.mockResolvedValueOnce({ data: mockUser, error: null });

    const result = await validarUsuario('test@example.com', 'securepassword');

    expect(result).toEqual(mockUser);
  });

  test('debe retornar null cuando hay error en Supabase', async () => {
    const mockError = new Error('Error de conexión');
    supabase.single.mockResolvedValueOnce({ data: null, error: mockError });

    const result = await validarUsuario('test@example.com', 'wrongpass');

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error al validar usuario:', mockError);
  });

  test('debe retornar null cuando no se encuentra el usuario', async () => {
    const mockError = { message: 'No encontrado', code: 'PGRST116' };
    supabase.single.mockResolvedValueOnce({ data: null, error: mockError });

    const result = await validarUsuario('noexist@test.com', 'pass');

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error al validar usuario:', mockError);
  });
});
