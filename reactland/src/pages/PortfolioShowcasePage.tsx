// reactland/src/pages/PortfolioShowcasePage.tsx

import { useEffect, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { PinContainer } from "@/components/ui/3d-pin";

// Interface for project data
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

  useEffect(() => {
    const projectsDataElement = document.getElementById('portfolio-projects-data');
    if (projectsDataElement) {
      try {
        const rawJson = projectsDataElement.textContent;
        console.log("Raw JSON from script tag:", rawJson); // For debugging raw JSON input

        const parsedData = JSON.parse(rawJson || '[]'); // Safely parse, default to empty array string if null/empty

        if (Array.isArray(parsedData)) { // Explicitly check if the parsed data is an array
          const typedProjects: Project[] = parsedData; // Type assertion after successful check
          console.log("Parsed projects data:", typedProjects); // For debugging parsed data

          if (typedProjects.length > 0) {
            setHeroProject(typedProjects[0]);
          }
          setProjects(typedProjects); // Always set projects to the parsed array, even if empty
        } else {
          console.error("Parsed data from 'portfolio-projects-data' is not an array:", parsedData);
          setProjects([]); // Fallback to an empty array if not an array
        }
      } catch (error) {
        console.error("Failed to parse project data from script tag. Error:", error);
        setProjects([]); // Ensure projects is an empty array on JSON parsing error
      }
    } else {
      console.warn("Element with ID 'portfolio-projects-data' not found in the DOM.");
      setProjects([]); // Ensure projects is an empty array if the element is missing
    }
  }, []);

  // Update loading state check to also consider the projects array length
  if (!heroProject && projects.length === 0) {
    return <div className="text-center p-12 text-white">Loading projects...</div>;
  }

  return (
    <div className="flex flex-col overflow-hidden ">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white mb-8">
              From Concept to Creation<br />
              <span className="text-4xl md:text-6xl font-bold mt-1 leading-none text-brand-gold">
                A Showcase of My Work
              </span>
            </h1>
          </>
        }
      >
        {/* Render heroProject image only if heroProject exists */}
        {heroProject ? (
          <img
            src={heroProject.imageUrl || ''}
            alt={`${heroProject.title} preview`}
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        ) : (
          // Fallback if no hero project is available
          <div className="h-[720px] w-full bg-gray-800 flex items-center justify-center rounded-2xl">
              <p className="text-white text-lg">No hero project available.</p>
          </div>
        )}
      </ContainerScroll>

      <div className="p-4 md:p-10">
        <h2 className="text-3xl font-bold text-center my-10 text-white">
          Explore My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Use projects.map; the Array.isArray check above ensures 'projects' is an array */}
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-center">
              <PinContainer title={project.link} href={project.link}>
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                    {project.title}
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-400">
                      {project.description}
                    </span>
                  </div>
                  <div
                    className="flex flex-1 w-full rounded-lg mt-4 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                </div>
              </PinContainer>
            </div>
          ))}
          {/* Display message if no projects are loaded */}
          {projects.length === 0 && (
            <div className="col-span-full text-center text-white text-lg p-8">
              No projects to display. Please add some projects in the admin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}