/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          'Oxygen', 
          'Ubuntu', 
          'Cantarell', 
          '"Fira Sans"', 
          '"Droid Sans"', 
          '"Helvetica Neue"',
          'Helvetica', 
          'Arial', 
          'sans-serif'
        ],
        mono: [
          'source-code-pro', 
          'Menlo', 
          'Monaco', 
          'Consolas', 
          '"Courier New"', 
          'monospace'
        ],
      },
      colors: {
        spotify: {
          green: "#1db954", // Spotify green
          dark: "#212121", // Dark gray
          darker: "#121212", // Almost black
          gray: "#535353", // Spotify gray
          lightGray: "#b3b3b3", // Lighter gray
        },
      },
    },
  },
  plugins: [],
};
