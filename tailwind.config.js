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
        gray:{
          700: "#6A6A6A"
        }
      },
      fontSize: {
        xxxs: ['6px', '10px'],
        xxs: ['8px', '12px'],
      }
    }
  },
  plugins: [],
}