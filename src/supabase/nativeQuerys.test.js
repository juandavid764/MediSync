// validarUsuario.test.js
import { supabase } from "./client.js";
import { validarUsuario } from "./nativeQuerys.js";

// Encademiento de funciones para simular el comportamiento de Supabase
jest.mock("./client.js", () => {
  const mockSupabase = {
    from: jest.fn(() => mockSupabase),
    select: jest.fn(() => mockSupabase),
    eq: jest.fn(() => mockSupabase),
    single: jest.fn(() => Promise.resolve({ data: null, error: null }))
  };

  return { supabase: mockSupabase };
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
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('debe retornar usuario cuando las credenciales son válidas', async () => {
    
    //Configurar el mock para devolver un usuario simulado
    supabase.single.mockResolvedValueOnce({ data: mockUser, error: null });
    const result = await validarUsuario('test@example.com', 'securepassword');

    expect(result).toEqual(mockUser);
  });

  test('debe retornar null cuando hay error en Supabase', async () => {

    // Configurar el mock para devolver un error simulado
    const mockError = new Error('Error de conexión');
    supabase.single.mockResolvedValueOnce({ data: null, error: mockError });

    const result = await validarUsuario('test@example.com', 'wrongpass');

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error al validar usuario:', mockError);
    expect(console.log).toHaveBeenCalledWith('Error al validar usuario:', mockError);
  });

  test('debe retornar null cuando no se encuentra el usuario', async () => {

    // Configurar el mock para devolver un error simulado
    const mockError = { message: 'No encontrado', code: 'PGRST116' };
    supabase.single.mockResolvedValueOnce({ data: null, error: mockError });

    const result = await validarUsuario('noexist@test.com', 'pass');

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error al validar usuario:', mockError);
  });
});