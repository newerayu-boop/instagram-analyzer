/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0907',
        accent: '#f0a661',
        'accent-strong': '#e8933f',
      },
    },
  },
  plugins: [],
};
