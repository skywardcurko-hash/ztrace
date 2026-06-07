import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0D0D0D',
        dark: '#111111',
        surface: '#181818',
        'surface-2': '#1F1F1F',
        blue: {
          DEFAULT: '#00B7FF',
          dim: 'rgba(0,183,255,0.1)',
          glow: 'rgba(0,183,255,0.25)',
        },
        border: 'rgba(0,183,255,0.15)',
        muted: '#555555',
        subtle: '#333333',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'scan': 'scan 4s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fadeUp': 'fadeUp 0.5s ease both',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(16px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(0,183,255,0.1)' },
          'to': { boxShadow: '0 0 30px rgba(0,183,255,0.3)' },
        },
      },
      backgroundImage: {
        'grid': 'linear-gradient(rgba(0,183,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,183,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}

export default config
