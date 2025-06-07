// reactland/src/PortfolioShowcasePage.tsx

import React, { useEffect, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { PinContainer } from "@/components/ui/3d-pin";

// Define the structure of a project object to match the JSON from Django
interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  imageUrl: string | null;
}

export function PortfolioShowcasePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [heroProject, setHeroProject] = useState<Project | null>(null);

  // This useEffect hook now reads data directly from the DOM, not from an API call.
  useEffect(() => {
    // 1. Find the <script> tag where Django placed our project data
    const projectsDataElement = document.getElementById('portfolio-projects-data');

    if (projectsDataElement) {
      try {
        // 2. Parse the JSON string from the script tag's content
        const parsedProjects: Project[] = JSON.parse(projectsDataElement.textContent || '[]');

        if (parsedProjects.length > 0) {
          // 3. Set the state: The first project is the hero, and the full list is used for the pins
          setHeroProject(parsedProjects[0]); // The most recent project for the hero
          setProjects(parsedProjects);      // The full list for the grid
        }

        console.log("Successfully parsed project data from template.", parsedProjects);

      } catch (error) {
        console.error("Failed to parse project data from script tag:", error);
      }
    } else {
        console.warn("Project data script tag '#portfolio-projects-data' not found.");
    }
  }, []); // The empty array [] ensures this effect runs only once when the component mounts.

  // If there's no data yet (or it failed to load), show a loading message.
  if (!heroProject) {
    return <div className="text-center p-12 text-white">Loading project data...</div>;
  }

  // Once data is loaded, render the full page with the hero and the pins.
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Dynamic Hero Section using the most recent project */}
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Featured Project: <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                {heroProject.title}
              </span>
            </h1>
          </>
        }
      >
        <img
          src={heroProject.imageUrl || ''} // Use the hero project's image
          alt={`${heroProject.title} preview`}
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      {/* Grid of All Project Pins */}
      <div className="p-4 md:p-10">
        <h2 className="text-3xl font-bold text-center my-10 text-white">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-center">
              <PinContainer title={project.link} href={project.link}>
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                    {project.title}
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500">
                      {project.description}
                    </span>
                  </div>
                  <div
                    className="flex flex-1 w-full rounded-lg mt-4 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${project.imageUrl})`
                    }}
                  />
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}