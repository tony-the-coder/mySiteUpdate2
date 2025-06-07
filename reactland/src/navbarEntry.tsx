import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Import the CustomNavbar using a named import
import { CustomNavbar } from './components/CustomNavbar';

const navbarRoot = document.getElementById('react-navbar-root');

if (navbarRoot) {
  ReactDOM.createRoot(navbarRoot).render(
    <React.StrictMode>
      <CustomNavbar />
    </React.StrictMode>
  );
  console.log("React CustomNavbar initialized successfully.");
} else {
  console.error("Failed to find the 'react-navbar-root' element in the DOM.");
}