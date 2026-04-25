import React from 'react';

const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400 ${className}`}
      {...props}
    />
  );
};

export default Input;
