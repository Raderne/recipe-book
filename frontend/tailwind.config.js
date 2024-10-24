/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        neue: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        offwhite: "#f3f2ec",
        primary: "#2f5f48",
      },
    },
  },
  plugins: [],
};
