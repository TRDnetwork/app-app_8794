import React from 'react';

export const Navbar = () => {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="container mx-auto px-6 py-4 flex justify-between items-center"
    >
      <a
        href="#hero"
        className="text-xl font-bold text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#d42f3f] rounded"
        aria-current="page"
      >
        Jane Doe
      </a>
      <ul className="flex space-x-8">
        {['About', 'Projects', 'Contact'].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="relative text-[#1a1a1a] hover:text-[#d42f3f] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#d42f3f] after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:after:w-full"
              aria-label={`Scroll to ${item} section`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};