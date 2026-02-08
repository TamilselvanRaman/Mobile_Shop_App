const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e", // Deep Navy
          950: "#082f49",
        },
        slate: {
          850: "#1e293b", // Custom Dark
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem", // rounded-lg
        md: "0.375rem", // rounded-md
        sm: "0.25rem", // rounded-sm
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 0 0 1px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
