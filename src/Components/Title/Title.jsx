import React from 'react';

const Title = ({ children, level = 1, className = '', ...props }) => {
  const Tag = `h${level}`;
  
  const sizes = {
    1: "text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight",
    2: "text-3xl md:text-4xl font-bold text-gray-800 tracking-tight",
    3: "text-2xl md:text-3xl font-semibold text-gray-800",
    4: "text-xl md:text-2xl font-semibold text-gray-800",
    5: "text-lg md:text-xl font-medium text-gray-700",
    6: "text-base md:text-lg font-medium text-gray-700",
  };

  return (
    <Tag 
      className={`${sizes[level] || sizes[1]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Title;
