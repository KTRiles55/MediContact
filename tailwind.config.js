module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'small': '600px',
        'medium': '1200px',
        'large': '1800px'
      },

      spacing: {
        'half': '5px',
        'single': '10px',
        'double': '20px'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'hover', 'disabled'],
      borderColor: ['hover', 'focus'],
      cursor: ['hover', 'focus'],
      display: ['responsive'],
      fontSize: ['responsive'],
      maxHeight: ['responsive'],
      maxWidth: ['responsive'],
      objectPosition: ['responsive']
    },
  },
  plugins: [],
}
