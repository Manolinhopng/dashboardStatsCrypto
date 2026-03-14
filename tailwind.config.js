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
        dark: {
          900: '#0B0F19',
          800: '#111827',
          700: '#1F2937',
        },
        primary: {
          500: '#8B5CF6', // Purple
          600: '#7C3AED',
        },
        secondary: {
          500: '#10B981', // Emerald
          600: '#059669',
        },
        accent: {
          500: '#F59E0B', // Amber
          600: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
      }
    },
  },
  plugins: [],
}
