// reactland/src/portfolioPageEntry.tsx
import React, { lazy, Suspense } from 'react'; // Import lazy and Suspense
import ReactDOM from 'react-dom/client';
import './index.css';

// Dynamically import the PortfolioShowcasePage component, handling its named export.
// This tells React.lazy to treat 'PortfolioShowcasePage' as the default export of this chunk.
const LazyPortfolioShowcasePage = lazy(() =>
  import('./pages/PortfolioShowcasePage').then(module => ({ default: module.PortfolioShowcasePage }))
);

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('portfolio-showcase-root'); // Verify this ID in your portfolio_showcase_react.html
  if (container) {
    // You might also need to pass projects_json data if the lazy-loaded component still relies on it
    // For now, assuming the component fetches its own data or handles data loading internally.
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <Suspense fallback={<div>Loading Portfolio...</div>}>
          <LazyPortfolioShowcasePage />
        </Suspense>
      </React.StrictMode>,
    );
  }
});