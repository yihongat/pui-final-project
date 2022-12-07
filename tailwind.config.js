/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C63939",
        secondary: "#EEF2F3",
        tertiary: "#E79393",
        primaryHover: "#D74040",
        primaryGrey: "#909090",
        secondaryGrey: "#C7CDD4",
        primaryBlack: "#222222",
      },
    },
  },
  plugins: [],
};
