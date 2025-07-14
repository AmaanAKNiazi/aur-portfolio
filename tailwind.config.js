/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        'purple': {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        'blue': {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        }
      },
    },
  },
  plugins: [],
}