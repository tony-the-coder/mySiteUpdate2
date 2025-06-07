import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NavbarDemo } from '@/components/resizable-navbar-demo';

const navbarRoot = document.getElementById('react-navbar-root');

if (navbarRoot) {
  ReactDOM.createRoot(navbarRoot).render(
    <React.StrictMode>
      <NavbarDemo />
    </React.StrictMode>
  );
  console.log("React NavbarDemo initialized successfully.");
} else {
  console.error("Failed to find the 'react-navbar-root' element.");
}