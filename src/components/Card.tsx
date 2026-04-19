import React from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, description, image, children, className = '' }) => {
  return (
    <div
      className={`
        group relative bg-white rounded-lg overflow-hidden shadow-sm border border-transparent
        hover:shadow-md hover:shadow-black/5 hover:translate-y-[-4px] hover:border-[#d42f3f]/10
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {image && (
        <div className="relative overflow-hidden h-48 bg-[#faf8f5]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2 tracking-tight">{title}</h3>
        <p className="text-[#6b6b6b] leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  );
};