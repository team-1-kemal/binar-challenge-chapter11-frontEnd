/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      pressstart: ['"Press Start 2P"', "cursive"],
    },
    extend: {
      scale: {
        "-100": "-1",
      },
    },
  },
  plugins: [],
};
