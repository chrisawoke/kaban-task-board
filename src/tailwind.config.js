/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xml: "412px",
      // => @media (min-width: 412px) { ... }

      xs: '360px',
      // => @media (min-width: 350px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      "2xl": '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
        montserrat: ['Montserrat']
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
