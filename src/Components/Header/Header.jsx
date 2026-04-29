import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoLink from '../LogoLink/LogoLink';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';

const Header = ({ onSearch, searchValue }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem('lang') || 'es'
  );

  const handleLangChange = (e) => {
    const selected = e.target.value;
    setLang(selected);
    localStorage.setItem('lang', selected);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo - vuelve al Home */}
        <LogoLink to="/" />

        {/* Buscador centrado */}
        <div className="flex-1 flex justify-center">
          <SearchBar
            value={searchValue}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            placeholder="Buscar imagen NASA..."
          />
        </div>

        {/* Controles derecha */}
        <div className="flex items-center gap-3">

          {/* Selector de idioma */}
          <select
            value={lang}
            onChange={handleLangChange}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:bg-white/20 transition-colors"
          >
            <option value="es" className="bg-slate-800">🇦🇷 ES</option>
            <option value="en" className="bg-slate-800">🇺🇸 EN</option>
          </select>

          {/* Botón Favoritos */}
          <Link to="/favorites">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10 focus:ring-white/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              Favoritos
            </Button>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;
