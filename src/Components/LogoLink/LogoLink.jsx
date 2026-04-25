import React from 'react';
import { Link } from 'react-router-dom';

const LogoLink = ({ to = "/", className = '', ...props }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 group transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 ${className}`}
      {...props}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      </div>
      <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">
        NASA<span className="font-light text-gray-500 text-lg ml-1">App</span>
      </span>
    </Link>
  );
};

export default LogoLink;
