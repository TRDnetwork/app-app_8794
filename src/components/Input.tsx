import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  type?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type = 'text',
  as = 'input',
  rows,
  ...props
}) => {
  const Component = as;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">{label}</label>
      <Component
        className={`
          w-full px-4 py-2.5 bg-white border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-[#d42f3f] focus:border-transparent
          text-[#1a1a1a] placeholder:text-[#6b6b6b]
          border-[#d42f3f]/20
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
        type={type}
        rows={as === 'textarea' ? rows : undefined}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};