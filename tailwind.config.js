/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted, 243 244 246) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground, 107 114 128) / <alpha-value>)",
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(violet|slate|emerald|amber|rose|teal|orange|lime|cyan|fuchsia)-(100|900)/,
    },
  ],
  plugins: [],
}
