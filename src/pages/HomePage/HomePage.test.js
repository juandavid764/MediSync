import { render, screen, fireEvent } from '@testing-library/react';
import { HomePage } from './HomePage';
import { useNavigate } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('HomePage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => mockNavigate);
    mockNavigate.mockClear();
  });

  test('renderiza correctamente el título y descripción', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Bienvenido a MediSync')).toBeInTheDocument();
    expect(
      screen.getByText(/Tu plataforma confiable para la gestión de información médica/i)
    ).toBeInTheDocument();
  });

  test('muestra el botón de acción principal', () => {
    render(<HomePage />);
    
    const button = screen.getByRole('button', { 
      name: /Iniciar Sesión \/ Registrarse/i 
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
  });

  test('navega a /authPage al hacer clic en el botón', () => {
    render(<HomePage />);
    
    fireEvent.click(
      screen.getByRole('button', { name: /Iniciar Sesión \/ Registrarse/i })
    );
    
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/authPage');
  });
});