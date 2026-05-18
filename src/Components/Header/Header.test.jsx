import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

const changeLanguageMock = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: changeLanguageMock }
  })
}));

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe('Header', () => {
  it('el logo "NASA App" está visible', () => {
    renderHeader();
    // Verifica si el LogoLink tiene como name (texto o aria-label) 'NASA App'
    const logoLink = screen.getByRole('link', { name: /NASA App/i }); 
    expect(logoLink).toBeInTheDocument();
  });

  it('el selector de idioma (ES/EN) existe en pantalla', () => {
    renderHeader();
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /ES/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /EN/i })).toBeInTheDocument();
  });

  it('el botón de Favoritos existe y tiene el texto correcto', () => {
    renderHeader();
    expect(screen.getByText('header.favorites')).toBeInTheDocument();
  });

  it('al cambiar el idioma guarda en localStorage (Bonus)', async () => {
    const user = userEvent.setup();
    renderHeader();
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'en');
    
    expect(localStorage.getItem('lang')).toBe('en');
    expect(changeLanguageMock).toHaveBeenCalledWith('en');
  });
});
