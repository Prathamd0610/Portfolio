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
        // ── ATELIER design system ──────────────────────────────
        // Warm editorial paper + ink, with a single electric citron
        // accent. Tokens are CSS variables so light/dark swap cleanly
        // without per-component `dark:` duplication.
        paper: 'rgb(var(--paper) / <alpha-value>)',
        'paper-raised': 'rgb(var(--paper-raised) / <alpha-value>)',
        'paper-sunken': 'rgb(var(--paper-sunken) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        'ink-faint': 'rgb(var(--ink-faint) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
      },
      fontFamily: {
        // Editorial serif for statements, clean sans for reading,
        // mono for metadata / indices.
        serif: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        display: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      boxShadow: {
        soft: '0 1px 2px -1px rgb(24 22 18 / 0.06), 0 10px 30px -14px rgb(24 22 18 / 0.16)',
        lift: '0 24px 60px -28px rgb(24 22 18 / 0.32)',
        accent: '0 14px 40px -14px rgb(207 242 74 / 0.55)',
        inset: 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },
      borderRadius: {
        '4xl': '1.75rem',
        '5xl': '2.25rem',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'marquee-rev': 'marquee-rev 38s linear infinite',
        'spin-slow': 'spin 22s linear infinite',
        reveal: 'reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};