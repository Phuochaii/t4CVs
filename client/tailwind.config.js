/** @type {import('tailwindcss').Config} */
/*eslint-env es6*/

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: () => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-linear": "linear-gradient(90deg, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      }),
      colors: {
        color1: "#123139",
        color2: "#17844b",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "300px",
        "1/3": "60%",
        "2/3": "40%",
      },
    },
  },
  plugins: [],
};
