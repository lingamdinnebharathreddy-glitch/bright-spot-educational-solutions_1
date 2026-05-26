/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B2545',      // Royal Blue Deep Background
          navy: '#134074',      // Deep Slate Blue for text/borders
          blue: '#084C94',      // Vibrant educational blue
          accent: '#1E3E62',    // Subtle support blue
          light: '#EEF4F8',     // Pale Ice Blue for light theme containers
          gold: '#D4AF37',      // Luxurious gold base
          goldDark: '#B8860B',  // Dark gold
          goldLight: '#E8C547', // Glowing light gold
          goldHover: '#C5A059'  // Brushed hover gold
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '24px'
      },
      boxShadow: {
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.3)'
      }
    },
  },
  plugins: [],
}
