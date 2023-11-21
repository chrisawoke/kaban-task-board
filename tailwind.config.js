/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto']
      },
      colors: {
        navyBlue: "#001F3F",
        steelGray: "#A9A9A9",
        forestGreen: "#228B22",
        burgundy: "#800020",
      }
    },
  },
  plugins: [],
};
