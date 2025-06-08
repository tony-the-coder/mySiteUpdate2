// reactland/src/homeHeroEntry.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeHero from './components/HomeHero';
import './index.css';

const container = document.getElementById('react-home-hero');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <HomeHero />
    </React.StrictMode>
  );
}