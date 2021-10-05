module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: "#FF886C",
      accent: "#FBEDE6",
      gray: "#E4E4E7",
      black: "#1A1A1A",
      aqua: "#1890FF",
      grass: "#52C41A",
      white: "#FFFFFF",
    },
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
