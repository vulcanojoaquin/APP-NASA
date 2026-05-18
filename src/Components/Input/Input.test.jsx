import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  it('renderiza con el placeholder que le pasás', () => {
    render(<Input placeholder="Buscando galaxias..." />);
    expect(screen.getByPlaceholderText('Buscando galaxias...')).toBeInTheDocument();
  });

  it('el value muestra lo que le enviás', () => {
    render(<Input value="Marte" readOnly />);
    expect(screen.getByDisplayValue('Marte')).toBeInTheDocument();
  });

  it('al escribir llama al onChange simulando un usuario real', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<Input placeholder="Escribir..." onChange={handleChange} />);
    
    await user.type(screen.getByPlaceholderText('Escribir...'), 'Sol');
    
    expect(handleChange).toHaveBeenCalledTimes(3); 
  });
});
