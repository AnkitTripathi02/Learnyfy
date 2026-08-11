/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

extend: {
  keyframes: {

    loading: {
      "0%": {
        transform: "translateX(-150%)",
      },
      "100%": {
        transform: "translateX(350%)",
      },
    },

    float: {
      "0%,100%": {
        transform: "translateY(0px)",
      },
      "50%": {
        transform: "translateY(-20px)",
      },
    },

  },

  animation: {
    loading: "loading 2s ease-in-out infinite",
    float: "float 4s ease-in-out infinite",
  },
},

  },

  plugins: [],
}