// import { settings } from './src/shared/constant/settings.contants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ed4c5f',
        secondary: '#ed4c5f',
        // primary: settings.colors.primary,
        // secondary: settings.colors.secondary,
      }
    },
  },
  plugins: [],
}