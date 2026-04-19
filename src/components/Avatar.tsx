import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', fallback }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-lg',
  };

  return (
    <div
      className={`
        rounded-full overflow-hidden flex items-center justify-center bg-[#d42f3f]/10 text-[#d42f3f]
        ${sizeClasses[size]}
      `}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium">{fallback || alt.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};