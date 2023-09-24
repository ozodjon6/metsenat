/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        SfProDisplay: ['SF-Pro-Display', 'sans-serif']
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}

