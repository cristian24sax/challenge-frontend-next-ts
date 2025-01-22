import { render, screen, fireEvent } from '@testing-library/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Header from './headers';

jest.mock('js-cookie');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header componente', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    localStorage.clear();
    jest.clearAllMocks();
  });

  it(' renderizado de logo y title', () => {
    render(<Header />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('EQUIP')).toBeInTheDocument();
  });

  it("muestra 'Usuario' cuando el userName no esta en localstorage", () => {
    render(<Header />);
    expect(screen.getByText('Usuario')).toBeInTheDocument();
  });

  it('muestra el nombre de usuario almacenado', () => {
    localStorage.setItem('userName', 'Cristian');
    render(<Header />);
    expect(screen.getByText('Cristian')).toBeInTheDocument();
  });

  it('alterna el menú cuando se hace clic en el botón', () => {
    render(<Header />);
    const toggleButton = screen.getByText('Usuario');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.queryByText('Cerrar Sesión')).not.toBeInTheDocument();
  });

  it("desconecta al usuario y redirecciona a '/'", () => {
    localStorage.setItem('accountId', '123');
    localStorage.setItem('userName', 'Cristian');
    render(<Header />);

    const toggleButton = screen.getByText('Cristian');
    fireEvent.click(toggleButton);

    const logoutButton = screen.getByText('Cerrar Sesión');
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('accountId')).toBeNull();
    expect(localStorage.getItem('userName')).toBeNull();
    expect(Cookies.remove).toHaveBeenCalledWith('accountId');
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
