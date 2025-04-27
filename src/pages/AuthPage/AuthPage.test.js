import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthPage } from './AuthPage';


jest.mock('../../components/LoginForm/LoginForm', () => ({
  LoginForm: ({ cambiarModo }) => (
    <div data-testid="login-form">
      <h2>Iniciar Sesión</h2>
      <button 
        onClick={cambiarModo}
        data-testid="switch-to-register"
      >
        ¡No tiene cuenta! Registrar
      </button>
    </div>
  )
}));

jest.mock('../../components/RegistroForm/RegistroForm', () => ({
  RegistroForm: ({ cambiarModo }) => (
    <div data-testid="registro-form">
      <h2>Registro de Paciente</h2>
      <button 
        onClick={cambiarModo}
        data-testid="switch-to-login"
      >
        ¿Ya tienes cuenta? Inicia sesión
      </button>
    </div>
  )
}));

describe('AuthPage', () => {
  test('renderiza LoginForm por defecto', () => {
    render(<AuthPage />);
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('¡No tiene cuenta! Registrar')).toBeInTheDocument();
  });

  test('cambia a RegistroForm al hacer clic', async () => {
    render(<AuthPage />);
    await act(async () => {
      fireEvent.click(screen.getByText('¡No tiene cuenta! Registrar'));
    });
    expect(screen.getByText('Registro de Paciente')).toBeInTheDocument();
  });

  test('vuelve a LoginForm al hacer clic', async () => {
    render(<AuthPage />);

    await act(async () => {
      fireEvent.click(screen.getByText('¡No tiene cuenta! Registrar'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('¿Ya tienes cuenta? Inicia sesión'));
    });
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
  });
});