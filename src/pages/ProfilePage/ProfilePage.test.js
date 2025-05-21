import { render, screen, fireEvent, act } from '@testing-library/react';
import { ProfilePage } from './ProfilePage';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


jest.mock('../../context/UserContext', () => ({
  useUser: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('../../supabase/crudFunctions/medicoTable', () => ({
  getMedicoById: jest.fn()
}));

jest.mock('../../supabase/crudFunctions/pacienteTable', () => ({
  getPacienteById: jest.fn()
}));

jest.mock('../../supabase/crudFunctions/adminTable', () => ({
  getAdminById: jest.fn()
}));

describe('ProfilePage', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();
  const mockUserMedico = {
    id: 1,
    tipo_usuario: 'medico',
    email: 'doctor@example.com'
  };
  const mockUserPaciente = {
    id: 2,
    tipo_usuario: 'paciente',
    email: 'paciente@example.com'
  };
  const mockUserAdmin = {
    id: 3,
    tipo_usuario: 'admin',
    email: 'admin@example.com'
  };

  beforeEach(() => {
    
    useUser.mockReturnValue({ user: mockUserMedico, logout: mockLogout });
    useNavigate.mockReturnValue(mockNavigate);
    
    
    require('../../supabase/crudFunctions/medicoTable').getMedicoById.mockResolvedValue({
      nombre: 'Dr. Juan',
      apellido: 'Pérez',
      especialidad: 'Cardiología',
      email: 'doctor@example.com',
      telefono: '1234567890',
      fecha_nac: '1980-01-01'
    });
    
    require('../../supabase/crudFunctions/pacienteTable').getPacienteById.mockResolvedValue(null);
    
    
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el estado de carga inicial', async () => {
    render(<ProfilePage />);
    expect(screen.getByText('Cargando tu perfil...')).toBeInTheDocument();
    await act(() => Promise.resolve());
  });

  test('renderiza el perfil de paciente cuando el tipo de usuario es paciente', async () => {
    useUser.mockReturnValue({ 
      user: mockUserPaciente, 
      logout: mockLogout 
    });
    
    require('../../supabase/crudFunctions/pacienteTable').getPacienteById.mockResolvedValue({
      nombre: 'Ana',
      apellido: 'Gómez',
      fecha_nac: '1990-05-15',
      direccion: 'Calle 123',
      telefono: '0987654321',
      email: 'ana@example.com'
    });

    render(<ProfilePage />);
    
    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText('Perfil de Paciente')).toBeInTheDocument();
    expect(screen.getByText('Ana Gómez')).toBeInTheDocument();
  });

  test('renderiza el perfil de administrador cuando el tipo de usuario es admin', async () => {
    useUser.mockReturnValue({ user: mockUserAdmin, logout: mockLogout });
    require('../../supabase/crudFunctions/adminTable').getAdminById.mockResolvedValue({
      email: 'admin@example.com',
      sede: 'Sede Central'
    });

    render(<ProfilePage />);
    
    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText('Perfil de Administrador')).toBeInTheDocument();
    expect(screen.getByText('admin@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sede Central')).toBeInTheDocument();
  });

  test('maneja el logout correctamente', async () => {
    render(<ProfilePage />);
    
    await act(async () => {
      await Promise.resolve();
    });

    fireEvent.click(screen.getByText('Cerrar Sesión'));
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('no hace logout si el usuario cancela', async () => {
    window.confirm.mockImplementationOnce(() => false);
    
    render(<ProfilePage />);
    
    await act(async () => {
      await Promise.resolve();
    });

    fireEvent.click(screen.getByText('Cerrar Sesión'));
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockLogout).not.toHaveBeenCalled();
  });

  test('muestra mensaje cuando no hay datos', async () => {
    require('../../supabase/crudFunctions/medicoTable').getMedicoById.mockResolvedValue(null);
    
    render(<ProfilePage />);
    
    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText('No se encontraron datos')).toBeInTheDocument();
  });
});