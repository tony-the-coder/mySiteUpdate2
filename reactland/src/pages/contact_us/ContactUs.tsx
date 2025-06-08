// reactland/src/pages/contact_us/ContactUs.tsx

import React, { useState } from 'react';
import GlobeDemo from '@/components/GlobeDemo';

const getCsrfToken = () => {
    const csrfTokenInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
    return csrfTokenInput ? (csrfTokenInput as HTMLInputElement).value : '';
};

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', type: '' });

  // ... (form handling logic remains the same)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: 'Submitting...', type: 'info' });

    fetch('/api/contact-submit/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCsrfToken() },
      body: JSON.stringify(form),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setStatus({ message: data.message, type: 'success' });
        setForm({ name: '', email: '', message: '' });
      } else {
        const errorMessages = Object.values(data.errors || {}).flat().join(' ');
        setStatus({ message: `Error: ${errorMessages}`, type: 'error' });
      }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        setStatus({ message: 'A network error occurred. Please try again.', type: 'error' });
    });
  };

  return (
    <div className="w-full">
        {/* === SECTION 1: GLOBE HERO === */}
        {/* This takes up the full screen height and contains the globe */}
        <div className="h-screen w-full">
            <GlobeDemo />
        </div>

        {/* === SECTION 2: CONTACT FORM === */}
        {/* This section appears below the globe hero */}
        <div className="w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8 -mt-48 relative z-10">
            <div className="bg-brand-white p-6 md:p-8 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-brand-charcoal">Send Me a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Your Name
                        </label>
                        <input
                            type="text" id="name" name="name" value={form.name} onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Your Email
                        </label>
                        <input
                            type="email" id="email" name="email" value={form.email} onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Your Message
                        </label>
                        <textarea
                            id="message" name="message" rows={5} value={form.message} onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full cta-button-primary mt-2">
                            Send Message
                        </button>
                    </div>
                    {status.message && (
                    <p className={`mt-4 text-center text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
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