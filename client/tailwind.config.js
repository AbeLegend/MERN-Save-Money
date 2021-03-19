module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '1024px',
      'lg': '1280px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
