import React, { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

const typeStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-600 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
} as const;

export const Toast: React.FC<ToastProps> = ({ id, type, message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  return (
    <div
      className={`
        flex items-center justify-between p-3 rounded-md shadow-lg min-w-64 max-w-xs
        ${typeStyles[type]}
        animate-in slide-in-from-top fade-in duration-300
      `}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="ml-2 text-current opacity-80 hover:opacity-100"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};