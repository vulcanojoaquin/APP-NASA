import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getFavorites,
  saveFavorites,
  isFavorite,
  toggleFavorite,
} from './favoritesStorage';

// ── Mock manual de localStorage ───────────────────────────────────────────────
// Creamos un localStorage falso en memoria para no depender del entorno
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

// Reemplazamos el localStorage global con nuestro mock
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Antes de cada test vaciamos el storage para empezar limpio
beforeEach(() => {
  localStorage.clear();
});

// ─── getFavorites ────────────────────────────────────────────────────────────
describe('getFavorites', () => {
  it('devuelve un array vacío si no hay nada guardado', () => {
    const result = getFavorites();
    expect(result).toEqual([]);
  });

  it('devuelve los favoritos guardados correctamente', () => {
    const fakeData = [{ id: '1', title: 'Nebulosa' }];
    localStorage.setItem('nasa_app_favorites', JSON.stringify(fakeData));

    const result = getFavorites();
    expect(result).toEqual(fakeData);
  });
});

// ─── isFavorite ──────────────────────────────────────────────────────────────
describe('isFavorite', () => {
  it('devuelve false si el item NO está en favoritos', () => {
    expect(isFavorite('999')).toBe(false);
  });

  it('devuelve true si el item SÍ está en favoritos', () => {
    saveFavorites([{ id: '42', title: 'Galaxia' }]);
    expect(isFavorite('42')).toBe(true);
  });
});

// ─── toggleFavorite ──────────────────────────────────────────────────────────
describe('toggleFavorite', () => {
  it('agrega el item si NO estaba guardado y devuelve true', () => {
    const item = { id: '10', title: 'Luna' };
    const result = toggleFavorite(item);

    expect(result).toBe(true);
    expect(getFavorites()).toContainEqual(item);
  });

  it('elimina el item si YA estaba guardado y devuelve false', () => {
    const item = { id: '10', title: 'Luna' };
    saveFavorites([item]);

    const result = toggleFavorite(item);

    expect(result).toBe(false);
    expect(getFavorites()).toHaveLength(0);
  });

  it('no elimina otros favoritos al quitar uno', () => {
    const item1 = { id: '1', title: 'Marte' };
    const item2 = { id: '2', title: 'Saturno' };
    saveFavorites([item1, item2]);

    toggleFavorite(item1); // quitamos solo el primero

    const remaining = getFavorites();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe('2');
  });
});
