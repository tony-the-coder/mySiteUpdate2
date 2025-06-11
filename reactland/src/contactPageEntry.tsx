// reactland/src/contactPageEntry.tsx
import React, { lazy, Suspense } from 'react'; // Import lazy and Suspense
import ReactDOM from 'react-dom/client';
import './index.css'; // Assuming common CSS

// Dynamically import the main ContactUs component
const LazyContactUs = lazy(() => import('./pages/contact_us/ContactUs'));

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('contact-us-page-root'); // Verify this ID in your contact_us.html
  if (container) {
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <Suspense fallback={<div>Loading Contact Form...</div>}>
          <LazyContactUs />
        </Suspense>
      </React.StrictMode>,
    );
  }
});