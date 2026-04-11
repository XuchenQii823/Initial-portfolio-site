/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        site: {
          bg: '#0A0A0A',
          text: '#F0F0F0',
          secondary: '#888888',
          tertiary: '#444444',
          border: '#1E1E1E',
          strata: '#121212',
          dimension: '#0D0B09',
          vitrum: '#07090E',
        },
      },
      fontFamily: {
        sans: [
          '"SF Pro Display"',
          '"SF Pro Text"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
