// reactland/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import ContactUsPage from './pages/contact_us/ContactUs.tsx'; // Adjust if your contact page component is elsewhere
// You might want to import global CSS for your React app here, e.g.:
// import './index.css'; // Assuming you have a reactland/src/index.css

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
    console.error('Failed to find the root element (#react-contact-form-root) for React Contact Us page.');
}

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