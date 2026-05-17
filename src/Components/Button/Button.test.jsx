import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('muestra el texto que se le pasa como children', () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('ejecuta el onClick cuando se hace click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn(); // función falsa para detectar si se llamó

    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica la variante primary por defecto', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-blue-600');
  });

  it('aplica la variante danger cuando se le pasa', () => {
    render(<Button variant="danger">Eliminar</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-red-600');
  });

  it('aplica la variante outline cuando se le pasa', () => {
    render(<Button variant="outline">Favoritos</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-blue-600');
  });

  it('acepta clases extra sin perder las del componente', () => {
    render(<Button className="mt-4">Extra</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('mt-4');
    expect(btn.className).toContain('bg-blue-600');
  });
});
