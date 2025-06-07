import React from 'react';
// Import Aceternity UI components if you want to use them here
// import { BackgroundBeams } from './ui/background-beams';

const AboutUsComponent: React.FC = () => {
  return (
    <div className="relative py-12 px-4 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-brand-charcoal mb-6">Our Values (React)</h2>
      <p className="text-center max-w-2xl mx-auto text-gray-700 mb-8">
        This section is now powered by React! We can add cool animations.
      </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-2">Innovation</h3>
          <p>We constantly strive for new and better solutions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-2">Quality</h3>
          <p>Excellence in every detail is our commitment.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;