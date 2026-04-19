import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variant === 'default' ? 'bg-[#d42f3f] text-white' : 'bg-gray-100 text-gray-800 border border-gray-200'}
        ${className}
      `}
    >
      {children}
    </span>
  );
};