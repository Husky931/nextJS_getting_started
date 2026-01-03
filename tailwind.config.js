/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5f3ef",
        surface: "#ffffff",
        ink: "#121212",
        muted: "#6b7280",
        border: "#e5e7eb",
        accent: "#1d4ed8",
        success: "#16a34a",
        danger: "#dc2626",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
