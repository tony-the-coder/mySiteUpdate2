// reactland/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import page-specific components
import ContactUsPage from './pages/contact_us/ContactUs';
import './index.css'; // Global styles

// --- Initialize Contact Us Page ---
const contactFormRootElement = document.getElementById('react-contact-form-root');

if (contactFormRootElement) {
  ReactDOM.createRoot(contactFormRootElement).render(
    <React.StrictMode>
      <ContactUsPage />
    </React.StrictMode>
  );
  console.log("React Contact Us page initialized successfully.");
}

// --- The portfolio logic has been REMOVED from this file ---
// It is now handled entirely by portfolioPageEntry.tsx