const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['BerkshireSwash', ...fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus', 'hover'],
    },
  },
  plugins: [],
};
