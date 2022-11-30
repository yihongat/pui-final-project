/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D74040",
        secondary: "#EEF2F3",
        tertiary: "#E79393",
        primaryGrey: "#909090",
      },
    },
  },
  plugins: [],
};
