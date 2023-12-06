/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "rgb(var(--color-off-white))",
        "green": "rgb(var(--color-green))",
        "gray-dark": "rgb(var(--color-gray-dark))",
        "gray": "rgb(var(--color-gray))",
        "gray-light": "rgb(var(--color-gray-light))",
        "th": "rgb(var(--color-th))",
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
