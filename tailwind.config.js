/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        "primary-100": "#3692FF",
        "primary-200": "#1967D6",
        "primary-300": "#1251AA",
        "gray-50": "#F9FAFB",
        "gray-100": "#FCFCFC",
        "gray-200": "#E5E7EB",
        "gray-400": "#9CA3AF",
        "gray-600": "#4B5563",
      },
    },
  },
  plugins: [],
};
