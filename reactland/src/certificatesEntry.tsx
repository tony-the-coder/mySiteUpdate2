import React from 'react';
import ReactDOM from 'react-dom/client';
import { HoverEffect } from './components/ui/card-hover-effect';
import './index.css'; // Your global CSS

// This function will fetch data from your Django API
async function fetchCertificates() {
  try {
    const response = await fetch('/api/certificates/'); // Assuming you'll create this API endpoint
    const data = await response.json();
    return data.map((cert: any) => ({
      title: cert.title,
      description: cert.description,
      link: cert.credential_url || '#', // Use credential_url if available
    }));
  } catch (error) {
    console.error("Failed to fetch certificates:", error);
    return [
      { title: "Error Loading", description: "Could not load certificates.", link: "#" }
    ]; // Fallback
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('certificates-root');
  if (container) {
    const certificates = await fetchCertificates();
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <HoverEffect items={certificates} />
      </React.StrictMode>,
    );
  }
});