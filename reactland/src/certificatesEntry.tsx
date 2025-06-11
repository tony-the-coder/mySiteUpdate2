// reactland/src/certificatesEntry.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HoverEffect } from './components/ui/card-hover-effect';
import './index.css';

interface CertificateData {
  title: string;
  description: string;
  link: string;
  imageUrl: string | null; // Add imageUrl property
}

async function fetchCertificates(): Promise<CertificateData[]> {
  try {
    const response = await fetch('/api/certificates/'); // Your new API endpoint
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map((cert: any) => ({
      title: cert.title,
      description: cert.description,
      link: cert.credential_url || '#',
      imageUrl: cert.image_url || null, // Map the image_url from your API
    }));
  } catch (error) {
    console.error("Failed to fetch certificates:", error);
    return [
      { title: "Error Loading", description: "Could not load certificates.", link: "#", imageUrl: null }
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