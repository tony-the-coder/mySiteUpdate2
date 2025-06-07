// your_project_root/reactland/src/pages/contact_us/ContactUs.tsx
import React, { useState } from 'react';
import { SparklesCore } from '@/components/ui/sparkles'; // Import SparklesCore
import { cn } from "@/lib/utils"; // Import cn utility (used for combining Tailwind classes)

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is your existing form submission logic
    console.log("Form submitted:", form);
    alert("Form submitted! (Check console for data)"); // For demonstration

    // In a real scenario, you'd send this to your Django API:
    // Make sure you have a function to get the CSRF token if submitting to Django
    // const getCsrfToken = () => {
    //   // Implement logic to get CSRF token from meta tag or cookie
    //   // Example for meta tag: document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    //   // This is crucial for Django POST requests.
    //   return 'your-csrf-token-here';
    // };

    // fetch('/api/contact-submit/', { // Use your Django API endpoint
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken': getCsrfToken(),
    //   },
    //   body: JSON.stringify(form),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.status === 'success') {
    //     alert(data.message);
    //     setForm({ name: '', email: '', message: '' }); // Clear form on success
    //   } else {
    //     alert('Error: ' + JSON.stringify(data.errors)); // Display validation errors
    //   }
    // })
    // .catch(error => console.error('Error submitting form:', error));
  };

  return (
    // This outer div now acts as the container for the Sparkles effect
    // We adjust its height and background color to frame the form
    <div className="relative w-full h-auto min-h-[600px] flex flex-col items-center justify-center overflow-hidden rounded-md bg-black">
      {/* Gradients from SparklesDemo - these are decorative elements */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

      {/* The SparklesCore component itself, positioned absolutely to cover the background */}
      {/* particleDensity, minSize, maxSize, particleColor can be tweaked for desired effect */}
      <SparklesCore
        background="transparent" // Let the div's bg-black show through
        minSize={0.4}
        maxSize={1.2} // Slightly larger max size for more prominent sparkles
        particleDensity={800} // Adjust density (lower for less, higher for more)
        className="absolute w-full h-full inset-0 z-0" // Stretches to cover the parent div
        particleColor="#FFFFFF" // White sparkles on dark background
      />

      {/* Radial Gradient overlay to prevent sharp edges of sparkles at the top */}
      {/* Ensure this z-index is between sparkles and your form content */}
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] z-10"></div>

      {/* Custom Contact Page Content (heading and intro text) */}
      {/* These elements need a higher z-index to appear above the sparkles */}
      <h1 className="md:text-7xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20 mb-8">
        Let's Connect {/* Custom heading for your contact page */}
      </h1>
      <p className="text-white text-base md:text-xl max-w-xl text-center relative z-20 mb-8">
        Have a project in mind, a question, or just want to connect? We'd love to hear from you.
      </p>

      {/* Your original Contact Form, wrapped to ensure it appears on top */}
      <div className="relative z-20 bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your form fields remain the same */}
          <div className="relative z-0 w-full group">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-0"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
            />
            <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Your Name
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-0"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Your Email
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-0"
              placeholder=" "
              value={form.message}
              onChange={handleChange}
            />
            <label htmlFor="message" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-indigo-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Message
            </label>
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;