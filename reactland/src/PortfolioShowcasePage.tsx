// reactland/src/components/PortfolioShowcasePage.tsx
import React from 'react';
// Adjust this path based on the actual location of 3d-pin.tsx relative to this file
import { PinContainer } from '../components/ui/3d-pin';

// Define an interface for your project data for type safety
interface Project {
  id: string; // Or number
  title: string;
  href: string;
  description: string;
  imageUrl?: string; // Optional image URL
  bgColor?: string; // Optional background color for the placeholder
}

// Array of your project data
const projects: Project[] = [
  {
    id: 'project1',
    title: 'Custom Home - The Mountain View',
    href: 'https://example.com/project-mountain-view',
    description: 'A stunning modern home with breathtaking panoramic views.',
    bgColor: 'from-indigo-500 via-purple-500 to-pink-500',
  },
  {
    id: 'project2',
    title: 'Luxury Estate Renovation',
    href: 'https://example.com/project-estate-reno',
    description: 'Complete overhaul of a historic estate, blending classic charm with contemporary luxury.',
    bgColor: 'from-emerald-500 via-teal-500 to-sky-500',
  },
  {
    id: 'project3',
    title: 'Downtown Loft Conversion',
    href: 'https://example.com/project-loft-conversion',
    description: 'Transforming industrial space into chic urban living.',
    bgColor: 'from-red-500 via-orange-500 to-yellow-500',
  },
  // Add 6 more project objects here...
  {
    id: 'project4',
    title: 'Project Alpha',
    href: 'https://example.com/project-alpha',
    description: 'Description for Project Alpha.',
    bgColor: 'from-gray-700 via-gray-800 to-gray-900',
  },
  {
    id: 'project5',
    title: 'Project Beta',
    href: 'https://example.com/project-beta',
    description: 'Description for Project Beta.',
    bgColor: 'from-cyan-400 via-blue-500 to-indigo-600',
  },
  {
    id: 'project6',
    title: 'Project Gamma',
    href: 'https://example.com/project-gamma',
    description: 'Description for Project Gamma.',
    bgColor: 'from-rose-400 via-fuchsia-500 to-purple-600',
  },
  {
    id: 'project7',
    title: 'Project Delta',
    href: 'https://example.com/project-delta',
    description: 'Description for Project Delta.',
    bgColor: 'from-lime-400 via-green-500 to-emerald-600',
  },
  {
    id: 'project8',
    title: 'Project Epsilon',
    href: 'https://example.com/project-epsilon',
    description: 'Description for Project Epsilon.',
    bgColor: 'from-amber-400 via-yellow-500 to-orange-600',
  },
  {
    id: 'project9',
    title: 'Project Zeta',
    href: 'https://example.com/project-zeta',
    description: 'Description for Project Zeta.',
    bgColor: 'from-sky-400 via-blue-500 to-indigo-500',
  },
];

export function PortfolioShowcasePage() {
  return (
    <div className="portfolio-showcase-container min-h-screen p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
        Our Showcase
      </h1>
      <div className="flex flex-wrap justify-center items-start gap-8 sm:gap-16">
        {projects.map((project) => (
          <PinContainer
            key={project.id} // Important for React lists
            title={project.title}
            href={project.href}
            containerClassName="w-full sm:w-auto"
          >
            {/* Content inside the pin card */}
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                {project.title}
              </h3>
              <div className="text-xs !m-0 !p-0 font-normal">
                <span className="text-slate-400">
                  {project.description}
                </span>
              </div>
              <div className={`flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br ${project.bgColor || 'from-gray-500 to-gray-700'} items-center justify-center`}>
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-white/50 text-sm">Image Placeholder</span>
                )}
              </div>
            </div>
          </PinContainer>
        ))}
      </div>
    </div>
  );
}