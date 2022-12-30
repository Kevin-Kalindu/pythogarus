/** @type {import('tailwindcss').Config} */
module.exports = {
  mode : "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "theme-yellow": '#ffc727',
        "theme-yellowd": '#e6b323',
        "theme-dark": '#37474f',
        gray: {
          100: '#E0E6E9',
          500: '#ABBBC2',
          700: '#1F1D2B',
          800: '#252836'
        },
        primary: '#EB966A',
        accent: {
          blue: '#65B0F6',
          green: '#50D1AA',
          red: '#FF7CA3',
          purple: '#9290FE',
          orange: '#ffb572'
        }
      },
      height:{
        'screen-75': '90vh',
        'screen-50': '50vh'
      },
      fontFamily:{
        'main': ['"Open Sans' ],
        sans : ['Barlow', 'sans-serif']
      }
    },
  },
  variants:{
    extend:{
      scale:['active', 'group-hover']
    }
  },
  plugins:[],
}
