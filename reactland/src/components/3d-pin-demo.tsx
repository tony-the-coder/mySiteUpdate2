// reactland/src/components/3d-pin-demo.tsx
"use client";
// REMOVED: import React from "react"; // Not needed with new JSX transform
// REMOVED: import { cn } from "@/lib/utils"; // Used by PinContainer internally
// REMOVED: import { motion } from "motion/react"; // Used by PinPerspective internally

import { PinContainer } from "@/components/ui/3d-pin"; // This is the component it demonstrates

// Define props for AnimatedPinDemo
interface AnimatedPinDemoProps {
  title: string;
  href: string;
  description: string;
}

export default function AnimatedPinDemo({ title, href, description }: AnimatedPinDemoProps) {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center ">
      <PinContainer
        title={title} // Use prop
        href={href}   // Use prop
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            {title}
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              {description}
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>
    </div>
  );
}

// REMOVED: export const PinPerspective = ...
// This component (PinPerspective) MUST ONLY be in src/components/ui/3d-pin.tsx.
// Its presence here caused the "Unused constant PinPerspective" and "Duplicated code fragment" warnings.