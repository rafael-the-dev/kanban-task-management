/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
        }
      },
      spacing: {
        "5": "5%"
      }
    },
    screens: {
      'sm': '600px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '900px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1024px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1280px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}