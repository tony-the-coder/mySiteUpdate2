// reactland/src/contactPageEntry.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import ContactUs from './pages/contact_us/ContactUs';
import './index.css';

const container = document.getElementById('react-contact-page-root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <ContactUs />
    </React.StrictMode>
  );
}