/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        "playFlair" : ["Playfair Display", "serif"]
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-color': '#7B1FA2'
      }
    },
  },
  plugins: [],
}

