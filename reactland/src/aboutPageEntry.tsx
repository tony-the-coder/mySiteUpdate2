// reactland/src/aboutPageEntry.tsx
import React, { lazy, Suspense } from 'react'; // Import lazy and Suspense
import ReactDOM from 'react-dom/client';
import './index.css';

// Dynamically import the main component for the About Us page
// This tells Vite to create a separate JavaScript chunk for AboutUsComponent.
const LazyAboutUsComponent = lazy(() => import('./components/AboutUsComponent'));

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('about-page-lamp-hero-root');
  if (container) {
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        {/* Suspense is required when using lazy-loaded components.
            The 'fallback' prop defines what React should render while the component's code is loading. */}
        <Suspense fallback={<div>Loading About Me section...</div>}>
          <LazyAboutUsComponent />
        </Suspense>
      </React.StrictMode>,
    );
  }
});