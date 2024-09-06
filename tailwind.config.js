const {nextui} = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B4002D",
        secondary: "#0C3464",
        tertiary: "#0C3464",
        default: "#ffffff",
        primaryDark:"#18181B" ,
        secondaryDark:"#000000",
        titleDark:"#d1d5db",
        textDark:"#f9fafb",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('tailwindcss-animated'),
    require('tailwind-scrollbar'),
  ],
}

