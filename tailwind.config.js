/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#00d68f',
          red: '#ff3d71',
          blue: '#0095ff',
          dark: '#0a0e17',
          navy: '#0d1421',
          card: '#111827',
          border: '#1f2937',
          text: '#e2e8f0',
          muted: '#64748b',
        },
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
