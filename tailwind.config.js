import rtl from "tailwindcss-rtl";
import tailwindcss from "@tailwindcss/vite";
import daisyui from "daisyui"; // ← Add this line

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [rtl(), daisyui],
};
