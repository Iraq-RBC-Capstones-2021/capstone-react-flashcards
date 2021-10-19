module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "70v": "70vh",
      },
      colors: {
        primary: "#FF886C",
        accent: "#FBEDE6",
        grey: "#E4E4E7",
        black: "#1A1A1A",
        aqua: "#1890FF",
        grass: "#52C41A",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      animation: {
        marquee: "marquee 10s linear 0.6s infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  variants: {
    extend: {
      brightness: ["responsive", "hover"],
      translate: ["responsive", "group-hover", "hover", "focus"],
      animation: ["hover", "focus", "group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/custom-forms"),
  ],
};
