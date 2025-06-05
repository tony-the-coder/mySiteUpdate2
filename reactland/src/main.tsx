// reactland/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import your page-specific root components
import ContactUsPage from './pages/contact_us/ContactUs'; // Path from your original main.tsx
// Adjusted path from previous advice

// You might want to import global CSS for your React app here, e.g.:
import './index.css'; // Assuming you have a reactland/src/index.css for global React styles
import { PortfolioShowcasePage } from './PortfolioShowcasePage.tsx';

// --- Initialize Contact Us Page ---
// Make sure your contact_us.html template has <div id="react-contact-form-root"></div>
const contactFormRootElement = document.getElementById('react-contact-form-root');

if (contactFormRootElement) {
  ReactDOM.createRoot(contactFormRootElement).render(
    <React.StrictMode>
      <ContactUsPage />
    </React.StrictMode>
  );
  console.log("React Contact Us page initialized successfully.");
} else {
  // Consider changing this to a console.warn or removing it for production,
  // as it's normal for this element not to be on every page.
  // console.warn('Root element #react-contact-form-root for Contact Us page not found on this page.');
}

// --- Initialize Portfolio Showcase Page ---
const portfolioShowcaseRootElement = document.getElementById('react-portfolio-showcase-root');
if (portfolioShowcaseRootElement) {
  ReactDOM.createRoot(portfolioShowcaseRootElement).render(
    <React.StrictMode>
      <PortfolioShowcasePage />
    </React.StrictMode>
  );
  console.log("React Portfolio Showcase page initialized successfully.");
} else {
  // console.warn('Root element #react-portfolio-showcase-root not found. Portfolio Showcase page not rendered.');
}

// The commented-out section below is a good reminder of the pattern for adding more components.
// If you want this main.tsx to handle other pages, you'll need logic
// to determine which component to render based on the page or target div.
// For example, to also handle the portfolio showcase on a div with id="portfolio-root":
// const portfolioRootElement = document.getElementById('portfolio-root');
// if (portfolioRootElement) {
//   // import PortfolioApp from './PortfolioApp.tsx'; // Assuming you have a root component for portfolio
//   // ReactDOM.createRoot(portfolioRootElement).render(
//   //   <React.StrictMode>
//   //     <PortfolioApp />
//   //   </React.StrictMode>
//   // );
// }