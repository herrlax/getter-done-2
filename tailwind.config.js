const { keyframes } = require('@emotion/react');
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./dist/*.html'],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5rem'
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        fillStroke: {
          '0%': {
            opacity: 0,
            strokeDasharray: '0, 100',
            strokeDashoffset: '0'
          },
          '10%': {
            opacity: 1
          },
          '100%': {
            strokeDasharray: `var(--percentage), 100`
          }
        }
      },
      animation: {
        'fade-in': '1s fadeIn 0s ease both',
        'fade-in-late': '1s fadeIn 1200ms ease both',
        'fade-out': '1s fadeOut 4s ease both',
        'fill-circle': '1500ms fillStroke 500ms ease both',
        'fill-check': '1200ms fillStroke 1500ms ease both'
      },
      colors: {
        sky: '#e6fbff',
        moss: '#239561',
        day: '#f5f6f7',
        night: '#1c1e21',
        teal: '#0a7e85',
        ocean: '#004484'
      },
      backgroundColor: {
        sky: '#e6fbff',
        moss: '#239561',
        day: '#f5f6f7',
        night: '#1c1e21',
        teal: '#0a7e85',
        ocean: '#004484'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        body: {
          fontFamily: 'Custom Sans Regular, Helvetica Neue, Helvetica',
          fontSize: '1rem',
          fontWeight: 400,
          padding: '8px',
          backgroundColor: '#1c1e21',
          color: '#f5f6f7',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale'
        },
        h1: {
          fontSize: theme('fontSize.4xl'),
          fontFamily: 'Custom Sans Black, Helvetica Neue, Helvetica',
          margin: '0',
          marginBottom: '0.5rem'
        },
        p: { margin: '1.5rem 0' },
        a: { color: '#ffffff' }
      });
    })
  ]
};
