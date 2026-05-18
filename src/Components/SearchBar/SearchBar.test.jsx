import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "./SearchBar";
import { describe, expect } from "vitest";

vi.mock("../Input/Input", () => ({
  // Mockeamos Input para no depender de su implementación interna.
  // Lo reemplazamos por un input nativo que igual acepta las mismas props,
  // así podemos probar value, onChange y placeholder sin problemas.
  default: ({ value, onChange, placeholder }) => (
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid="search-input" // id para encontrarlo fácilmente en los tests
    />
  ),
}));


const renderSearchBar = (props = {}) => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(), // función falsa que podemos espiar
    placeholder: 'Buscar...', // valor por defecto del componente
  };

  // Mezclamos los props por defecto con los que nos pasen en cada test.
  // Así podemos sobreescribir solo lo que necesitemos.
  return render(<SearchBar {...defaultProps} {...props} />);
};


describe('SearchBar - render básico', () => {
    it('renderiza el input de búsqueda', () => {
    renderSearchBar();

    // data-testid es más robusto que buscar por texto o clase CSS,
    // porque no cambia si cambia el diseño.
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('muestra el placeholder por defecto', () => {
    renderSearchBar();

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
    });

    it('muestra un placeholder personalizado si se le pasa uno', () => {
    renderSearchBar({ placeholder: 'Buscar galaxias...' });

    expect(screen.getByPlaceholderText('Buscar galaxias...')).toBeInTheDocument();
    });
});

describe('SearchBar - ícono lupa', () => {
    it('renderiza el ícono SVG de búsqueda', () => {
        const { container } = renderSearchBar();

    // container.querySelector busca directamente en el DOM renderizado.
    // Usamos esto porque el SVG no tiene texto ni rol accesible para buscar.
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    });
});

describe('SearchBar - props', () => {
    it('muestra el value que le pasamos', () => {
    renderSearchBar({ value: 'nebulosa' });

    expect(screen.getByDisplayValue('nebulosa')).toBeInTheDocument();
    // getByDisplayValue → busca un input por su valor actual visible
    });

    it('llama a onChange cuando el usuario escribe', () => {
    const handleChange = vi.fn(); // función espía

    renderSearchBar({ onChange: handleChange });

    // fireEvent.change → simula que el usuario escribió algo en el input
    fireEvent.change(screen.getByTestId('search-input'), {
        target: { value: 'andromeda' },
    });

    // Verificamos que onChange fue llamado (al menos una vez)
    expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('NO llama a onChange si no se escribe nada', () => {
    const handleChange = vi.fn();

    renderSearchBar({ onChange: handleChange });

    // No hacemos ningún fireEvent, así que onChange no debería haberse llamado
    expect(handleChange).not.toHaveBeenCalled();
    });
});