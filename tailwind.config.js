/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080c14',
          navy: '#0d1322',
          surface: '#111827',
          surfaceLight: '#1e293b',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(16, 185, 129, 0.4)',
          emerald: '#10b981',
          mint: '#34d399',
          cyan: '#06b6d4',
          teal: '#14b8a6',
          blue: '#3b82f6',
          amber: '#f59e0b'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
