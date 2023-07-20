/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'md': '960px',
      'lg': '1441px',
    },
   extend:{
    colors:{
      gray:{
        950:'#6C757D'
      },
      green:{
        'success':"#198754"
      },
      red:{
        'error':"#DC3545"
      },
      black:{
        'background':"#11101A"
      }
    }
   }
  },
  plugins: [],
}