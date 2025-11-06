import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'loteria-primary': '#049645',
        'loteria-secondary': '#0066b3',
        'mega-sena': '#209869',
        'lotofacil': '#930089',
        'quina': '#260085',
        'lotomania': '#f78100',
        'timemania': '#00ff48',
        'dupla-sena': '#a61324',
        'federal': '#103d8e',
        'dia-sorte': '#cb852b',
        'super-sete': '#a8cf45',
        'mais-milionaria': '#ee82ee',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
export default config
