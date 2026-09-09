/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
        },
        indigo: {
          600: "#4f46e5",
          700: "#4338ca",
        },
        emerald: {
          600: "#16a34a",
          700: "#15803d",
        },
      },
    },
  },
  plugins: [],
};
