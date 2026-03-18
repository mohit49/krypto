/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'w-[200px]',
    'h-[200px]',
    'w-[280px]',
    'h-[280px]',
    'w-[300px]',
    'w-[40%]',
    'w-[45%]',
    'w-[50%]',
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
