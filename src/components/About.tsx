import React from 'react';

export const About = () => {
  return (
    <section
      id="about"
      className="container mx-auto px-6 py-16"
      aria-labelledby="about-heading"
    >
      <h2 id="about-heading" className="text-subtitle mb-6">
        About Me
      </h2>
      <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto leading-relaxed">
        I'm a passionate full-stack developer with over 5 years of experience
        crafting digital solutions that balance aesthetics, performance, and
        accessibility. I believe in clean code, thoughtful design, and building
        products that make a difference. When I'm not coding, you'll find me
        hiking, reading sci-fi, or experimenting with new recipes.
      </p>
    </section>
  );
};