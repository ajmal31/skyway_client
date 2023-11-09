
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
        
      },
      letterSpacing: {
        wider: '0.2em', // Increase the word spacing
        widest: '0.0em', // Further increase the word spacing
      }
      
      
    },
  },
  plugins: [],
  
};
