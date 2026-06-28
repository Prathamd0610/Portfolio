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
        // Brand accent — indigo→violet→cyan aurora system
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          violet: '#7c3aed',
          cyan: '#06b6d4',
          blue: '#2563eb',
        },
        ink: '#0b0b10',
        surface: '#13131b',
        card: '#1a1a24',
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(99,102,241,0.1), 0 18px 40px -12px rgba(99,102,241,0.35)',
        'glow-lg': '0 30px 80px -20px rgba(124,58,237,0.45)',
        soft: '0 12px 40px -12px rgba(2,6,23,0.12)',
        'soft-dark': '0 12px 40px -12px rgba(0,0,0,0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        aurora: 'aurora 16s ease infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'spin-slow': 'spin 14s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,20px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aurora-text': 'linear-gradient(110deg,#2563eb,#6366f1,#7c3aed,#06b6d4)',
      },
    },
  },
  plugins: [],
};