/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#393939',
        secondary: '#496EB3',
      }
    },
  },
  plugins:  ["tailwindcss ,autoprefixer"]
}

