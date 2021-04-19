const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Merriweather', 'BerkshireSwash', ...fontFamily.sans],
      },
      colors: {
        marine: '#284181',
        paleMarine: '#284181CC',
      },
      width: {
        18: '74px',
      },
      height: {
        18: '74px',
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
