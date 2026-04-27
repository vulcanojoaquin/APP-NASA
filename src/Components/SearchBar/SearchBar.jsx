import React from 'react';
import Input from '../Input/Input';

const SearchBar = ({ value, onChange, placeholder = 'Buscar...' }) => {
  return (
    <div className="relative flex items-center w-full max-w-md">
      {/* Ícono lupa */}
      <span className="absolute left-3 text-gray-400 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </span>

      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar;
