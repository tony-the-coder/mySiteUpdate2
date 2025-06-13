// reactland/src/components/container-scroll-animation-demo.tsx
"use client";
// import React from "react"; // REMOVED: Not needed with new JSX transform
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// Define props for HeroScrollDemo
interface HeroScrollDemoProps {
  titleComponent: React.ReactNode;
  imageSrc: string;
}

// Ensure 'export default' is present here
export default function HeroScrollDemo({ titleComponent, imageSrc }: HeroScrollDemoProps) {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll titleComponent={titleComponent}>
        <img
          src={imageSrc} // Use prop
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}