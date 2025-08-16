/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Cormorant Garamond', ...fontFamily.serif],
      },
      colors: {
        primary: {
          50: '#f8f5f0',
          100: '#f0e9de',
          200: '#e1d4bd',
          300: '#c9b48e',
          400: '#b08c5f',
          500: '#9a7249',
          600: '#8a5c3a',
          700: '#6f482f',
          800: '#5b3c2a',
          900: '#4d3427',
        },
        secondary: {
          50: '#f5f7f7',
          100: '#e0e8e9',
          200: '#c2d1d3',
          300: '#9bb1b5',
          400: '#6c878d',
          500: '#5a6e74',
          600: '#4c5b61',
          700: '#414c50',
          800: '#3a4245',
          900: '#33393b',
        },
        accent: {
          50: '#f4f6f7',
          100: '#e3e8eb',
          200: '#cad4d9',
          300: '#a4b6bf',
          400: '#78909c',
          500: '#5d7582',
          600: '#4f6270',
          700: '#45535e',
          800: '#3d4750',
          900: '#373e45',
        },
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted, 243 244 246) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground, 107 114 128) / <alpha-value>)",
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'elevate': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(violet|slate|emerald|amber|rose|teal|orange|lime|cyan|fuchsia|red|yellow|indigo|green|brown)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  plugins: [],
}
