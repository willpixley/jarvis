/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Roboto Mono', 'monospace'] // Add Roboto Mono to the 'mono' stack
      },
      colors: {
        'teal-dark': '#1F2937',
        primary: '#212124',
        inverse: '#CBD5E1',
        background: '#161618'
      }
    }
  },
  plugins: []
}
