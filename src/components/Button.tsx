import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-[#d42f3f] hover:bg-red-700 text-white border-transparent',
  secondary: 'bg-[#ff6b35] hover:bg-orange-600 text-white border-transparent',
  outline: 'bg-transparent hover:bg-[#faf8f5] text-[#d42f3f] border border-[#d42f3f]',
  ghost: 'bg-transparent hover:bg-black/5 text-[#d42f3f] border-transparent',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
} as const;

const sizeStyles = {
  sm: 'text-sm py-1.5 px-3',
  md: 'text-base py-2 px-4',
  lg: 'text-lg py-3 px-6',
} as const;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`
        transition-all duration-200 ease-out
        font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d42f3f]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};