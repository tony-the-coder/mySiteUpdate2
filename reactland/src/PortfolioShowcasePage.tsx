// reactland/src/PortfolioShowcasePage.tsx
import React, { useState, useEffect } from 'react';
import { PinContainer } from '../components/ui/3d-pin';

// NEW: Interface matches the fields from your Django API view
interface Project {
  id: number;
  title: string;
  short_description: string;
  technologies_used: string;
  github_link: string;
  live_demo_url: string;
  imageUrl: string | null; // imageUrl can be a string or null
}

export function PortfolioShowcasePage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/portfolio-projects/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched projects:", data); // For debugging
        // This is the corrected line to access the array
        setProjects(data.projects);
      })
      .catch(error => console.error("Error fetching portfolio projects:", error));
  }, []);

  return (
    <div className="portfolio-showcase-container min-h-screen p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
        My Coding Projects
      </h1>
      <div className="flex flex-wrap justify-center items-start gap-8 sm:gap-16">
        {projects.map((project) => (
          <PinContainer
            key={project.id}
            title={project.technologies_used}
            href={project.live_demo_url}
            containerClassName="w-full sm:w-auto"
          >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                {project.title}
              </h3>
              <div className="text-xs !m-0 !p-0 font-normal">
                <span className="text-slate-400">
                  {project.short_description}
                </span>
              </div>
              
              {/* UPDATED: This div now handles cases where there is no image */}
              <div
                className="flex flex-1 w-full rounded-lg mt-4 items-center justify-center bg-cover bg-center"
                style={{
                  // Use the project image if it exists, otherwise use a default gradient
                  backgroundImage: project.imageUrl
                    ? `url(${project.imageUrl})`
                    : 'linear-gradient(to bottom right, #334155, #1e293b)',
                }}
              >
                {!project.imageUrl && (
                  <span className="text-white/50 text-sm">No Image Available</span>
                )}
              </div>
            </div>
          </PinContainer>
        ))}
      </div>
    </div>
  );
}