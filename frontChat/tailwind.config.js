/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          slate: '#2F4F4F',
          accent: '#D9822B',
          paper: '#FCFCF7',
          surface: '#FFFFFF',
          mint: '#BBD5D0',
          grey: '#E0E0E0',
        },
        text: {
          primary: '#1C1C1C',
          secondary: '#616161',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 0 rgba(28,28,28,0.04), 0 4px 12px rgba(28,28,28,0.06)',
      },
      borderRadius: {
        md: '10px',
        lg: '12px',
      },
    },
  },
  plugins: [],
}