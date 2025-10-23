import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#800000', // Park Ridge Maroon
        secondary: '#FFD700', // Classic Gold
        accent: '#FFD700', // alias of secondary for legacy usage
        background: '#FDFBF7', // Stone White
        text: '#1C1C1C', // Charcoal Ink
        warmgray: '#B8B6B0', // Warm Gray
        crust: '#E6C69B', // Pizza Crust Beige
        buttonHover: '#A52A2A',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        subhead: ['var(--font-subhead)'],
        body: ['var(--font-body)'],
        button: ['var(--font-button)'],
        decorative: ['var(--font-decorative)'],
        // Legacy aliases used earlier in the project
        inter: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}

export default config
