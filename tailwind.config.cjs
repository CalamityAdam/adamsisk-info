/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
            'code::before': false,
            'code::after': false,
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
