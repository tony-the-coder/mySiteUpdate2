// reactland/src/certificatesEntry.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CardHoverEffectDemo from './components/ui/card-hover-effect-demo';
import '../assets/src/output.css'; // Ensure Tailwind CSS is included
import './index.css'; // Your global CSS

interface CertificateData {
    id: number;
    title: string;
    description: string;
    link: string; // This should be `credential_url` from Django mapped to `link` for the component
}

const CertificatesComponent = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/certificates/'); // Your Django API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming Django REST Framework output: [{id:..., title:..., description:..., credential_url:...}]
        const formattedData: CertificateData[] = data.map((cert: any) => ({
            id: cert.id,
            title: cert.title,
            description: cert.description,
            link: cert.credential_url || '#', // Map credential_url to link
        }));
        setCertificates(formattedData);
      } catch (err: any) {
        console.error("Failed to fetch certificates:", err);
        setError("Failed to load certifications. Please try again later.");
        // Provide a fallback if data fetching fails
        setCertificates([
            { id: 1, title: "Error Loading", description: "Could not load certificates.", link: "#" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div className="text-center text-white">Loading certifications...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <React.StrictMode>
      <CardHoverEffectDemo items={certificates} />
    </React.StrictMode>
  );
};


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('certificates-root');
  if (container) {
    ReactDOM.createRoot(container).render(<CertificatesComponent />);
  }
});