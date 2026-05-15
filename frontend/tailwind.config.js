/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        appleBlue: '#0071e3',
        appleGrey: '#1d1d1f',
        obsidian: '#050505',
        surface: '#121212',
        glass: 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        sf: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s infinite alternate',
        'pulse-subtle': 'pulse-subtle 4s infinite ease-in-out',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};