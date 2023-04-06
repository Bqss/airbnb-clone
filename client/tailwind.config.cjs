/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        "Circular": ["Circular","sans-serif"]
      },
      keyframes : {
        pop : {
            '20%' : {
                transform: 'scale(.7)'
            },
            '100%' : {
                transform: 'scale(1) '
            }
        }
      },
      animation: {
        'pop' : 'pop .5s ease-in-out'
      }
    },
  },
  plugins: [],
}
