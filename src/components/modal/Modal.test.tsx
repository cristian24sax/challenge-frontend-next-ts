import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  it('no se muestra cuando isOpen es falso', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>
    );
    // Verifica que el contenido no se encuentra en el DOM
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('se muestra el modal correctamente cuando isOpen es verdadero', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>
    );
    // Verifica que el contenido aparece en el DOM
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('llama a onClose cuando se hace clic en el botón cerrar', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);

    // Verifica que se llamó la función onClose
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('muestra el children(componente) dentro del modal', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>children</div>
      </Modal>
    );

    // Verifica que los children se renderizan
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
