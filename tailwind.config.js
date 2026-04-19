/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#faf8f5',
        surface: '#ffffff',
        text: '#1a1a1a',
        'text-dim': '#6b6b6b',
        accent: '#d42f3f',
        'accent-alt': '#ff6b35',
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
};