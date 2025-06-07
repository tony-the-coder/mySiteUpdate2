// reactland/src/portfolioPageEntry.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles
// CORRECTED PATH: The import now looks inside the 'pages' folder.
import { PortfolioShowcasePage } from './pages/PortfolioShowcasePage.tsx';

// Find the specific root element in the portfolio template
const portfolioRootElement = document.getElementById('react-portfolio-showcase-root');

// If it exists, render the PortfolioShowcasePage component into it
if (portfolioRootElement) {
  ReactDOM.createRoot(portfolioRootElement).render(
    <React.StrictMode>
      <PortfolioShowcasePage />
    </React.StrictMode>
  );
  console.log("React Portfolio Showcase page initialized successfully via portfolioPageEntry.tsx.");
}