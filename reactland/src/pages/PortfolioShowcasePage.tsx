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
        const parsedProjects: Project[] = JSON.parse(projectsDataElement.textContent || '[]');
        if (parsedProjects.length > 0) {
          setHeroProject(parsedProjects[0]);
          setProjects(parsedProjects);
        }
      } catch (error) {
        console.error("Failed to parse project data from script tag:", error);
      }
    }
  }, []);

  if (!heroProject) {
    // This loading state is important for when the component first mounts
    return <div className="text-center p-12 text-white">Loading projects...</div>;
  }

  return (
    // This single div now controls the background for the whole page section.
    <div className="flex flex-col overflow-hidden ">

      {/* The ContainerScroll is the hero with new, descriptive text */}
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
        {/* The hero still features the most recent project image */}
        <img
          src={heroProject.imageUrl || ''}
          alt={`${heroProject.title} preview`}
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      {/* The project grid section with its own heading */}
      <div className="p-4 md:p-10">
        <h2 className="text-3xl font-bold text-center my-10 text-white">
          Explore My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-center">
              {/* Each pin is a clickable link to the project */}
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
        </div>
      </div>
    </div>
  );
}