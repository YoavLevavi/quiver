// This is a Tailwind CSS configuration file for a React project.
// It sets up custom themes, colors, and font families, and includes support for RTL (right-to-left) languages.

// tailwind.config.js
import rtl from "tailwindcss-rtl";
import tailwindcss from "@tailwindcss/vite";

// This is a Tailwind CSS configuration file for a React project.
/** @type {import('tailwindcss').Config} */
export default {
  // Specify the paths to all of the template files in your project
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // include TS/TSX for React

  // Specify the paths to all of the template files in your project
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [rtl(), tailwindcss()],
};
