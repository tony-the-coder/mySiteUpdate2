import React from 'react';
import ReactDOM from 'react-dom/client';
import CardHoverEffectDemo from './components/ui/card-hover-effect-demo';
import '../assets/src/output.css';
import './index.css';

// This function will fetch data from your Django API
async function fetchCertificates() {
  try {
    const response = await fetch('/api/certificates/');
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
        <CardHoverEffectDemo items={certificates} />
      </React.StrictMode>,
    );
  }
});