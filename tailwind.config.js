/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dim: {
          50: '#5F99F7',
          100: '#5F99F7',
          200: '#38444d',
          300: '#202e3a',
          400: '#253341',
          500: '#5F99F7',
          600: '#5F99F7',
          700: '#192734',
          800: '#162d40',
          900: '#15202b',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1d9bf0',

          'primary-content': '#ffff',

          secondary: '#6b7074',

          'secondary-content': '#e0e1e2',

          accent: '#1600ff',

          'accent-content': '#c8dbff',

          neutral: '#232630',

          'neutral-content': '#cecfd1',

          'base-100': '#000000',

          'base-200': '#000000',

          'base-300': '#000000',

          'base-content': '#bebebe',

          info: '#00c1ff',

          'info-content': '#000e16',

          success: '#649d00',

          'success-content': '#030900',

          warning: '#ffa400',

          'warning-content': '#160a00',

          error: '#ff005f',

          'error-content': '#160003',
        },
      },
    ],
  },
};
