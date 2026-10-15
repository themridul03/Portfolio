/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        secondary: "#949494",
        tertiary: "#111111",
        neon: "#00ffae",
        "neon-glow": "rgba(0, 255, 174, 0.15)",
        "black-100": "#141414",
        "black-200": "#050505",
        "white-100": "#ffffff",
      },
      boxShadow: {
        neon: "0 0 25px rgba(0, 255, 174, 0.35)",
        card: "0 20px 60px rgba(0, 0, 0, 0.6)",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        sans: ["Switzer", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
