/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "#f1f1f1",
        "green": "#6db33f",
        "gray-dark": "#34302D",
        "gray": "#555555",
        "gray-light": "#CCCCCC",
        "th": "#3c3834",
        "odd": "#f9f9f9",
      },
      spacing: {
        "brand-x": "229px",
        "brand-y": "46px",
        "menu-y": "76px",
      },
      keyframes: {
        loader: {
          "0%, 80%, 100%": {
            "box-shadow": "0 0",
            "height": "4em",
          },
          "40%": {
            "box-shadow": "0 -2em",
            "height": "5em",
          },
        },
      },
      animation: {
        loader: "loader 1s infinite ease-in-out"
      },
    },
  },
  plugins: [],
};

module.exports = config;
