import { HoverEffect } from "@/components/ui/card-hover-effect"; // This path is correct due to tsconfig.json

// This will be replaced with data fetched from Django
export const projects = [
  {
    title: "Example Cert 1",
    description: "Description for example certificate 1.",
    link: "#", // Replace with actual link
  },
  {
    title: "Example Cert 2",
    description: "Description for example certificate 2.",
    link: "#",
  },
  // Add more example items here or fetch dynamically
];

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}