// import { settings } from './src/shared/constant/settings.contants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1D1D1D',
        secondary: '#282828 ',
        tertiary: '#BAF4FF',
        quaternary: '#7180B7',
        // primary: settings.colors.primary,
        // secondary: settings.colors.secondary,
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}