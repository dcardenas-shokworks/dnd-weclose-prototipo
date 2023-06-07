/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00B3DF',
      },
      fontSize: {
        xxxs: ['6px', '10px'],
        xxs: ['8px', '12px'],
      }
    }
  },
  plugins: [],
}