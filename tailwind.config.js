/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      
      backgroundImage: {
        gradient: 'linear-gradient(214deg, #c6ffe8 0%, #63f4ab 25%, #0a538b 100%)',
        gradient2: 'linear-gradient(135deg, #dff5ff 0%, #8a8af1 100%)'
      },
      colors: {
        green: {
          300: '#c6ffe8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'san-serif'],
      },
    },
  },
  plugins: [],
}