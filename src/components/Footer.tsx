import React from 'react';

export const Footer = () => {
  return (
    <footer
      className="bg-white border-t border-[#d42f3f]/10 py-8"
      role="contentinfo"
    >
      <div className="container mx-auto px-6 text-center text-[#6b6b6b] text-sm">
        &copy; {new Date().getFullYear()} Jane Doe. Crafted with care.
      </div>
    </footer>
  );
};