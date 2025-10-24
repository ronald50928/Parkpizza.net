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
        primary: '#800000', // Park Ridge Maroon (kept)
        secondary: '#FFD700', // Classic Gold (kept)
        accent: '#FFD700', // alias of secondary for legacy usage
        background: '#FDFBF7', // Stone White
        text: '#1C1C1C', // Charcoal Ink
        warmgray: '#B8B6B0', // Warm Gray
        crust: '#E6C69B', // Pizza Crust Beige
        buttonHover: '#A52A2A',
        // Electric Modern subtle accents
        electric: '#7C3AED', // Purple - innovation, tech
        electricLight: '#C084FC', // Light Purple - soft highlights
        electricPink: '#EC4899', // Hot Pink - energy, fun
        electricAmber: '#F59E0B', // Amber - warmth
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
