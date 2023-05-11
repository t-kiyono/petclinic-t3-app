const colors = require("./src/styles/colors");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
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
