import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details from './Details';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock('../../Components/FavoriteButton/FavoriteButton', () => ({
  default: () => <button data-testid="favorite-btn">★</button>,
}));

vi.mock('../Error404/Error404', () => ({
  default: () => <div data-testid="error-404">No encontrado</div>,
}));

vi.mock('../../services/apodService', () => ({
  getApodById: vi.fn(),
}));

import { getApodById } from '../../services/apodService';

// Helper para renderizar Details
const renderDetails = (route = '/details/1') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Details />
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Details - Con item válido', () => {
  it('muestra el título, la fecha, la descripción y el FavoriteButton', async () => {
    getApodById.mockResolvedValue({
      title: 'Galaxia de Andrómeda',
      date: '2026-05-18',
      explanation: 'Una gran galaxia espiral.',
      hdurl: 'https://test.com/img.jpg',
    });

    renderDetails();

    await waitFor(() => {
      expect(screen.queryByText('details.loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Galaxia de Andrómeda')).toBeInTheDocument();
    expect(screen.getByText('2026-05-18')).toBeInTheDocument();
    expect(screen.getByText('Una gran galaxia espiral.')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
  });

  it('el link "Volver" lleva al Home', async () => {
    getApodById.mockResolvedValue({});

    renderDetails();

    await waitFor(() => {
      expect(screen.queryByText('details.loading')).not.toBeInTheDocument();
    });

    const link = screen.getByRole('link', { name: 'details.back' });
    expect(link).toHaveAttribute('href', '/');
  });
});

describe('Details - Con ID inválido', () => {
  it('si el ID no existe redirige a la pantalla de Error 404', async () => {
    getApodById.mockResolvedValue(null);

    renderDetails('/details/999');

    await waitFor(() => {
      expect(screen.getByTestId('error-404')).toBeInTheDocument();
    });
  });
});
