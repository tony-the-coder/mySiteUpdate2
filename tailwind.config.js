/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './portfolio_app/templates/**/*.html',
    './portfolio_app/forms.py',
    './reactland/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': 'var(--color-brand-white)',
        'brand-charcoal': 'var(--color-brand-charcoal)',
        'brand-charcoal-darker': 'var(--color-brand-charcoal-darker)',
        'brand-gold': 'var(--color-brand-gold)',
        'brand-gold-light': 'var(--color-brand-gold-light)',
        'brand-gold-richer': 'var(--color-brand-gold-richer)',
        'brand-red-border': 'var(--color-brand-red-border)',
        'brand-gray-light': 'var(--color-brand-gray-light)',
        'brand-gray-medium': 'var(--color-brand-gray-medium)',
        'brand-gray-text': 'var(--color-brand-gray-text)',
      },
      animation: {
        'text-generate': 'text-generate 1s steps(40, end) forwards',
        'caret-blink': 'caret-blink 0.75s step-end infinite',
        'star-fall': 'star-fall 27s linear infinite',
        'aurora': 'aurora 60s linear infinite',
      },
      keyframes: {
        'text-generate': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'caret-blink': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': 'var(--color-brand-gold)' },
        },
        'star-fall': {
          'from': { transform: 'translateY(-100px)'},
          'to': { transform: 'translateY(100vh)'}
        },
        'aurora': {
            from: {
              "background-position": "50% 50%, 50% 50%",
            },
            to: {
              "background-position": "350% 50%, 350% 50%",
            },
        },
      }
    }
  },
  plugins: [],
};