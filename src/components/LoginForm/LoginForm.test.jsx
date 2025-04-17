import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { validarUsuario } from '../../supabase/nativeQuerys';

// mck de las dependencias externas
jest.mock('../../context/UserContext');
jest.mock('react-router-dom');
jest.mock('../../supabase/nativeQuerys');

describe('LoginForm', () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();
  const mockCambiarModo = jest.fn();

  beforeEach(() => {
    useUser.mockReturnValue({ login: mockLogin });
    useNavigate.mockReturnValue(mockNavigate);
    validarUsuario.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Prueba 1: Renderizado inicial
  test('Renderiza correctamente los elementos del formulario', () => {
    render(<LoginForm cambiarModo={mockCambiarModo} />);
    
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument();
    expect(screen.getByText('¿No tienes cuenta?')).toBeInTheDocument();
  });

  // Prueba 2: Validación de campos vacíos
  test('Muestra error al enviar el formulario con campos vacíos', async () => {
    render(<LoginForm cambiarModo={mockCambiarModo} />);
    
    fireEvent.submit(screen.getByRole('button', { name: 'Ingresar' }));
    
    // Los inputs required mostrarán el mensaje nativo del navegador
    //! No se verifica mensaje específico ya que el formulario tiene required
    expect(validarUsuario).not.toHaveBeenCalled();
  });

  // Prueba 3: Credenciales incorrectas
  test('Muestra mensaje de error con credenciales incorrectas', async () => {
    validarUsuario.mockResolvedValue(null);
    render(<LoginForm cambiarModo={mockCambiarModo} />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'usuario@test.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Ingresar' }));
    
    await waitFor(() => {
      expect(screen.getByText('❌ Usuario o contraseña incorrectos')).toBeInTheDocument();
      expect(validarUsuario).toHaveBeenCalledWith('usuario@test.com', 'password123');
      expect(mockLogin).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  // Prueba 4: Login exitoso
  test('Realiza login exitoso y navega a /profile', async () => {
    const mockUserData = { id: 1, email: 'usuario@test.com' };
    validarUsuario.mockResolvedValue(mockUserData);
    
    render(<LoginForm cambiarModo={mockCambiarModo} />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'usuario@test.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Ingresar' }));
    
    await waitFor(() => {
      expect(validarUsuario).toHaveBeenCalledWith('usuario@test.com', 'password123');
      expect(mockLogin).toHaveBeenCalledWith(mockUserData);
      expect(mockNavigate).toHaveBeenCalledWith('/profile');
      expect(screen.queryByText('❌ Usuario o contraseña incorrectos')).not.toBeInTheDocument();
    });
  });

  // Prueba 5: Cambio a modo registro
  test('Llama a cambiarModo al hacer clic en "Regístrate"', () => {
    render(<LoginForm cambiarModo={mockCambiarModo} />);
    
    fireEvent.click(screen.getByText('Regístrate'));
    expect(mockCambiarModo).toHaveBeenCalled();
  });
});