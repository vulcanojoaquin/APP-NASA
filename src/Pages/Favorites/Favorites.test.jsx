import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Favorites from './Favorites';

// Mockeamos i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mockeamos FavoriteButton para simplificar (no necesitamos testearlo aquí)
vi.mock('../../Components/FavoriteButton/FavoriteButton', () => ({
  default: () => <button>★</button>,
}));

// Mockeamos el storage: controlamos qué favoritos "hay guardados"
vi.mock('../../utils/favoritesStorage', () => ({
  getFavorites: vi.fn(),
}));

import { getFavorites } from '../../utils/favoritesStorage';

// Helper: renderiza con el Router que necesita el <Link> interno
const renderFavorites = () =>
  render(
    <MemoryRouter>
      <Favorites />
    </MemoryRouter>
  );

describe('Favorites - lista vacía', () => {
  it('muestra el mensaje de "sin favoritos" si no hay nada guardado', () => {
    getFavorites.mockReturnValue([]); // simulamos storage vacío

    renderFavorites();

    expect(screen.getByText('favorites.empty')).toBeInTheDocument();
  });

  it('muestra un link para volver al Home cuando está vacío', () => {
    getFavorites.mockReturnValue([]);

    renderFavorites();

    expect(screen.getByText('favorites.goHome')).toBeInTheDocument();
  });
});

describe('Favorites - con items guardados', () => {
  const fakeItems = [
    { id: '1', title: 'Nebulosa del Cangrejo', date: '2024-01-01', url: 'https://img1.jpg' },
    { id: '2', title: 'Galaxia de Andrómeda', date: '2024-02-01', url: 'https://img2.jpg' },
  ];

  it('muestra las cards de los favoritos guardados', () => {
    getFavorites.mockReturnValue(fakeItems);

    renderFavorites();

    expect(screen.getByText('Nebulosa del Cangrejo')).toBeInTheDocument();
    expect(screen.getByText('Galaxia de Andrómeda')).toBeInTheDocument();
  });

  it('NO muestra el mensaje de vacío si hay favoritos', () => {
    getFavorites.mockReturnValue(fakeItems);

    renderFavorites();

    expect(screen.queryByText('favorites.empty')).not.toBeInTheDocument();
  });

  it('muestra el título de la página de favoritos', () => {
    getFavorites.mockReturnValue(fakeItems);

    renderFavorites();

    expect(screen.getByText('favorites.title')).toBeInTheDocument();
  });
});
