/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          text:             '#220b2d',
          bg:               '#fffeeb',
          primary:          '#6d3a8e',
          'primary-dark':   '#52297a',
          secondary:        '#bd98e7',
          'secondary-light':'#f2ecfb',
          'secondary-border':'#d4b8f0',
          accent:           '#ffd166',
          card:             '#fff8c5',
        },
      },
    },
  },
  plugins: [],
}