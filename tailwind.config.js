/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./about.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /^(min-h|h)-\[.+\]$/ },
    { pattern: /^md:(min-h|h)-\[.+\]$/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['proxima-nova', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
