/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#f4efe6",
        secondary: "#6b7280",
        tertiary: "#0d0f14",
        "black-100": "#121418",
        "black-200": "#080a0f",
        "white-100": "#ffffff",
      },
      boxShadow: {
        card: "0px 35px 90px -15px rgba(0, 0, 0, 0.4)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
