import React from 'react';

export const Hero = () => {
  return (
    <section
      id="hero"
      className="container mx-auto px-6 py-16 md:py-24 text-center"
      aria-labelledby="hero-heading"
    >
      <h1 id="hero-heading" className="text-display mb-4">
        Jane Doe
      </h1>
      <p className="text-subtitle text-[#6b6b6b] mb-8 max-w-2xl mx-auto">
        Full-Stack Developer & UI Craftsman
      </p>
      <p className="text-lg text-[#6b6b6b] mb-10 max-w-2xl mx-auto">
        Building performant, accessible web experiences with precision and care.
      </p>
      <button
        className="bg-[#d42f3f] text-white px-8 py-3 rounded-md text-lg font-medium pulse hover:shadow-lg transition-shadow focus:outline-none focus:ring-4 focus:ring-[#d42f3f]/50"
        aria-label="Contact me to discuss opportunities"
      >
        Let’s Work Together
      </button>
    </section>
  );
};