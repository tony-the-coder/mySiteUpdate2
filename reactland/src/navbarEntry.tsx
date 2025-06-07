// reactland/src/navbarEntry.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// UPDATE THIS IMPORT
import { CustomNavbar } from '@/components/CustomNavbar';

const navbarRoot = document.getElementById('react-navbar-root');

if (navbarRoot) {
  ReactDOM.createRoot(navbarRoot).render(
    <React.StrictMode>
      {/* UPDATE THIS COMPONENT */}
      <CustomNavbar />
    </React.StrictMode>
  );
  console.log("React Custom Navbar initialized successfully.");
}