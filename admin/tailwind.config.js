/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class', // Optional: Add if you want dark mode support
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors: {
        'primary': '#5F6FFF',
        gray: {
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
        },
        pink: {
          900: '#831843',
          800: '#9D174D',
          700: '#BE185D',
          600: '#DB2777',
          500: '#EC4899',
          400: '#F472B6',
          300: '#F9A8D4',
        }
      }
    },
  },
  plugins: [],
}