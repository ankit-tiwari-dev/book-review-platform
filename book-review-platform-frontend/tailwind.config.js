/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {extend: {
      fontSize: {
        '96px': '96px',
      },
      fontFamily: {
      manrope: ['Manrope', 'sans-serif'],
    },
  },
}

  },
  plugins: [],
}