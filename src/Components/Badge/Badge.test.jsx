import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('muestra el texto correcto que se le pasa como children', () => {
    render(<Badge>Activo</Badge>);
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });

  it('si no se pasa variant, usa las clases por defecto', () => {
    render(<Badge>Default Text</Badge>);
    const badge = screen.getByText('Default Text');
    
    expect(badge.className).toContain('bg-gray-100');
    expect(badge.className).toContain('text-gray-800');
  });

  it('aplica el color correcto para variant danger', () => {
    render(<Badge variant="danger">Peligro</Badge>);
    const badge = screen.getByText('Peligro');
    
    expect(badge.className).toContain('bg-red-100');
    expect(badge.className).toContain('text-red-800');
  });

  it('aplica el color correcto para variant success', () => {
    render(<Badge variant="success">OK</Badge>);
    const badge = screen.getByText('OK');
    
    expect(badge.className).toContain('bg-green-100');
    expect(badge.className).toContain('text-green-800');
  });
});
