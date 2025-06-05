import React, { useState } from 'react';

const ContactUsPage = () => { // Renamed to ContactUsPage for clarity if it's a full page component
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Simulate API call
    // In a real app, you'd use fetch or axios here to POST to your Django API endpoint
    // e.g., to `/api/contact-submit/`
    try {
      // const response = await fetch('/api/contact-submit/', { // Your actual API endpoint
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Add CSRF token if your API endpoint requires it
      //     // 'X-CSRFToken': getCookie('csrftoken'), // You'd need a getCookie function
      //   },
      //   body: JSON.stringify(form),
      // });
      // const data = await response.json();

      // MOCKUP: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = { status: 'success', message: 'Your message has been sent successfully! We will be in touch soon.' }; // Mock success
      // const data = { status: 'error', message: 'Something went wrong. Please try again.' }; // Mock error

      if (data.status === 'success') {
        setSubmitStatus({ type: 'success', message: data.message });
        setForm({ name: '', email: '', message: '' }); // Clear form
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'An unexpected error occurred.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Common input field styling
  const inputBaseClasses = "block w-full px-4 py-3 mt-1 text-base text-brand-charcoal placeholder-gray-500 bg-brand-white border border-brand-gray-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-colors";

  return (
    <div className="bg-brand-gray-light py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-charcoal font-heading mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-brand-gray-text font-body max-w-xl mx-auto">
            Have a project in mind, a question, or just want to connect? I'd love to hear from you.
          </p>
        </div>

        <div className="bg-brand-white p-8 sm:p-10 md:p-12 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal font-body mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={inputBaseClasses}
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., Jane Doe"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal font-body mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputBaseClasses}
                value={form.email}
                onChange={handleChange}
                placeholder="e.g., jane.doe@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-charcoal font-body mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className={`${inputBaseClasses} resize-y`}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or inquiry..."
                disabled={isSubmitting}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-brand-white bg-brand-gold hover:bg-brand-gold-light hover:text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-all duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>

            {submitStatus.message && (
              <div className={`mt-6 p-4 rounded-md text-sm ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-300' : 'bg-red-50 text-red-700 border border-red-300'}`}
                   role="alert">
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;