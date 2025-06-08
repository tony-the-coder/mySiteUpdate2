// reactland/src/components/HomeHero.tsx

"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function HomeHero() {
  const words = [
    { text: "I" },
    { text: "build" },
    { text: "modern" },
    { text: "web" },
    {
      text: "applications.",
      className: "text-brand-gold dark:text-brand-gold", // Applies your brand's gold color
    },
  ];

  // This function navigates the browser to a new URL.
  const handleNavigate = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[40rem] text-center px-4">

      {/* Sub-headline */}
      <p className="text-neutral-200 text-base sm:text-lg mb-2">
        Full-Stack Developer | Python & React Specialist
      </p>

      {/* Typewriter with corrected, larger font sizes */}
      <TypewriterEffectSmooth
        words={words}
        className="text-4xl md:text-6xl lg:text-7xl font-bold"
      />

      {/* Button container: Stacks vertically on mobile, side-by-side on larger screens */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-10">

        {/*
          BUTTON 1: "View My Work"
          - Uses onClick for navigation.
          - Applies the 'cta-button-primary-inverted' class from your CSS.
        */}
        <button
          onClick={() => handleNavigate("/portfolio/")}
          className="cta-button-primary-inverted"
        >
          View My Work
        </button>

        {/*
          BUTTON 2: "Get In Touch"
          - Uses onClick for navigation.
          - Applies the 'cta-button-secondary' class from your CSS.
        */}
        <button
          onClick={() => handleNavigate("/contact/")}
          className="cta-button-secondary"
        >
          Get In Touch
        </button>
      </div>
    </div>
  );
}