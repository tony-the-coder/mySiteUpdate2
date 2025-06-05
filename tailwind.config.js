// Corrected tailwind.config.js (should be at the root of your Django project)
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',                     // For project-level templates
    './portfolio_app/templates/**/*.html',      // For your app's templates
    './portfolio_app/forms.py',                 // For forms in your app
    './reactland/src/**/*.{js,jsx,ts,tsx}',      // For your React components
    // Add any other paths where you use Tailwind classes
  ],
  // If you are using Tailwind CSS v3 features for theme customization or plugins,
  // they would be defined here.
  // For example:
  // theme: {
  //   extend: {
  //     colors: {
  //       'brand-gold': '#B08D57', // Example
  //     },
  //   },
  // },
  // plugins: [],
};