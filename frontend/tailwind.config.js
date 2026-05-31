/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#00b0ff",
        "background-light": "#f8f9ff",
        "background-dark": "#0b1c30",
        "accent-gold": "#0064f9ff",
      },
      fontFamily: {
        display: ["var(--font-lexend)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      keyframes: {
        // Zoom in perlahan — efek Ken Burns
        kenburns: {
          "0%":   { transform: "scale(1)    translateX(0%)   translateY(0%)" },
          "100%": { transform: "scale(1.15) translateX(-2%)  translateY(-1%)" },
        },
        // Fade in untuk slide yang aktif
        "slide-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Fade out untuk slide yang keluar
        "slide-out": {
          "0%":   { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        kenburns:   "kenburns 6s ease-in-out forwards",
        "slide-in": "slide-in 1s ease-in-out forwards",
        "slide-out":"slide-out 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
