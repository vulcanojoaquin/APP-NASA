import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteButton from './FavoriteButton';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));


vi.mock('../../utils/favoritesStorage', () => ({
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
}));

import { isFavorite, toggleFavorite } from '../../utils/favoritesStorage';

const fakeItem = { id: '1', title: 'Galaxia Andrómeda' };

beforeEach(() => {
  vi.clearAllMocks();
});

describe('FavoriteButton', () => {
  it('renderiza un botón en pantalla', () => {
    isFavorite.mockReturnValue(false);
    render(<FavoriteButton item={fakeItem} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('muestra el título "agregar" si el item NO es favorito', () => {
    isFavorite.mockReturnValue(false);
    render(<FavoriteButton item={fakeItem} />);
    expect(screen.getByRole('button')).toHaveAttribute('title', 'favoriteButton.add');
  });

  it('muestra el título "eliminar" si el item YA es favorito', () => {
    isFavorite.mockReturnValue(true);
    render(<FavoriteButton item={fakeItem} />);
    expect(screen.getByRole('button')).toHaveAttribute('title', 'favoriteButton.remove');
  });

  it('llama a toggleFavorite al hacer click', async () => {
    const user = userEvent.setup();
    isFavorite.mockReturnValue(false);
    toggleFavorite.mockReturnValue(true);

    render(<FavoriteButton item={fakeItem} />);
    await user.click(screen.getByRole('button'));

    expect(toggleFavorite).toHaveBeenCalledWith(fakeItem);
  });

  it('cambia el estilo visualmente al hacer click (amarillo = favorito)', async () => {
    const user = userEvent.setup();
    isFavorite.mockReturnValue(false);
    toggleFavorite.mockReturnValue(true); // simula que ahora ES favorito

    render(<FavoriteButton item={fakeItem} />);
    const btn = screen.getByRole('button');

    await user.click(btn);

    expect(btn.className).toContain('bg-yellow-500');
  });
});
