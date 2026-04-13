/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        gold2: '#8a6e30',
        brandBg: '#07070C',
        s1: '#0f0f18',
        s2: '#16161f',
        border: '#1a1a28',
        green: '#39e58c',
        text: '#ddddf0',
        muted: '#55556e',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        disp: ['"Bebas Neue"', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
      animation: {
        'tick': 'tick 18s linear infinite',
        'pulse-slow': 'pulse-slow 2s infinite',
      },
      keyframes: {
        tick: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
