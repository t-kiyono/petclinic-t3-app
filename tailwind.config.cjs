/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "white": "#f1f1f1",
        "green": "#6db33f",
        "gray-dark": "#34302D",
      },
      spacing: {
        "brand-x": "229px",
        "brand-y": "46px",
        "menu-y": "76px",
      },
    },
  },
  plugins: [],
};

module.exports = config;
