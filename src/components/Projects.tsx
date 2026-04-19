import React from 'react';

const projects = [
  {
    id: 1,
    title: 'TaskFlow',
    description:
      'A minimalist productivity app with dark mode and keyboard shortcuts.',
    image: 'https://via.placeholder.com/400x250/faf8f5/1a1a1a?text=TaskFlow',
  },
  {
    id: 2,
    title: 'BudgetWise',
    description:
      'An intuitive budgeting tool with real-time analytics and export options.',
    image: 'https://via.placeholder.com/400x250/faf8f5/1a1a1a?text=BudgetWise',
  },
  {
    id: 3,
    title: 'FitTrack',
    description:
      'A fitness companion app with workout logging, progress charts, and reminders.',
    image: 'https://via.placeholder.com/400x250/faf8f5/1a1a1a?text=FitTrack',
  },
];

export const Projects = () => {
  return (
    <section
      id="projects"
      className="container mx-auto px-6 py-16"
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="text-subtitle mb-10 text-center">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className="bg-white p-6 rounded-lg shadow-sm hover-lift hover:shadow-md transition-shadow duration-300 focus-within:shadow-md"
            tabIndex={0}
            aria-labelledby={`project-title-${project.id}`}
          >
            <img
              src={project.image}
              alt={`Screenshot of ${project.title} application`}
              className="w-full h-48 object-cover rounded-md mb-4"
              loading="lazy"
            />
            <h3
              id={`project-title-${project.id}`}
              className="text-card text-[#1a1a1a] mb-2"
            >
              {project.title}
            </h3>
            <p className="text-[#6b6b6b]">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};