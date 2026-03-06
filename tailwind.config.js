/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./about/**/*.html",
    "./solutions/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'w-[200px]',
    'h-[200px]',
    'w-[280px]',
    'h-[280px]',
    'w-[300px]',
    'w-[360px]',
    'h-[360px]',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['proxima-nova', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '96rem', /* 1536px */
      },
    },
  },
  plugins: [],
}
