// reactland/src/pages/contact_us/ContactUs.tsx

import React, { useState } from 'react';
import GlobeDemo from '@/components/GlobeDemo'; // Import the new globe component

// This function is needed to get the CSRF token for Django form submission
const getCsrfToken = () => {
    const csrfTokenInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
    return csrfTokenInput ? (csrfTokenInput as HTMLInputElement).value : '';
};

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: 'Submitting...', type: 'info' });

    fetch('/api/contact-submit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken(),
      },
      body: JSON.stringify(form),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setStatus({ message: data.message, type: 'success' });
        setForm({ name: '', email: '', message: '' }); // Clear form
      } else {
        const errorMessages = Object.values(data.errors || {}).flat().join(' ');
        setStatus({ message: `Error: ${errorMessages}`, type: 'error' });
      }
    })
    .catch(error => {
        console.error('Error submitting form:', error)
        setStatus({ message: 'A network error occurred. Please try again.', type: 'error' });
    });
  };

  return (
    // Main container is now relative to position children
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">

        {/* The Globe component is placed here as the background. It's positioned absolutely to fill the container. */}
        <div className="absolute inset-0 z-0">
            <GlobeDemo />
        </div>

        {/* All your form content is now placed in a relative container with a higher z-index to appear on top of the globe */}
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white text-center">
                Let's Connect
            </h1>
            <p className="text-lg md:text-xl text-white opacity-80 mb-8 text-center">
                Have a project in mind or just want to say hello?
            </p>

            <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-2xl max-w-md w-full border border-white/20">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/80">
                            Your Name
                        </label>
                        <input
                            type="text" id="name" name="name" value={form.name} onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-white/30 bg-black/30 text-white rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/80">
                            Your Email
                        </label>
                        <input
                            type="email" id="email" name="email" value={form.email} onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-white/30 bg-black/30 text-white rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white/80">
                            Your Message
                        </label>
                        <textarea
                            id="message" name="message" rows={5} value={form.message} onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-white/30 bg-black/30 text-white rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full cta-button-primary">
                            Send Message
                        </button>
                    </div>
                    {status.message && (
                    <p className={`mt-4 text-center text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {status.message}
                    </p>
                    )}
                </form>
            </div>
        </div>
    </div>
  );
};

export default ContactUs;