/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indigo': {
          900: '#312e81',
          950: '#1e1b4b',
        }
      }
    },
  },
  plugins: [],
}