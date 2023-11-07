
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#000235',
        'secondory':'#13124F',
        'button':'#011A98',
        'sec-button':"#3B25C2"

      },
      fontFamily:{
        'Outfit':['Outfit', 'sans-serif'],
        'Outfit-button':['Outfit','sans-serif']
        
      }
      
    },
  },
  plugins: [],
  
};
