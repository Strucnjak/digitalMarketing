/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bdigital-navy": "#0a1f3e",
        "bdigital-dark-navy": "#07172a",
        "bdigital-cyan": "#00d4ff",
        "bdigital-cyan-light": "#33eaff",
        "neutral-gray": "#6b7280",
      },
    },
  },
  plugins: [],
};
