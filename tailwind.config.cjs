/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      colors: {
        'background-primary': 'var(--background-primary)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        black: 'var(--black)',
        white: 'var(--white)',
        red: 'var(--red)',
        'red-dark': 'var(--red-dark)',
        yellow: 'var(--yellow)',
        orange: 'var(--orange)',
        green: 'var(--green)',
        blue: 'var(--blue)',
        cyan: 'var(--cyan)',
      },
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
};
