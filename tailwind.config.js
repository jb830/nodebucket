/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1800px',
        '4xl': '2560px',
      },
    },
  },
  content: [
    './src/**/*.{html,ts}',
  ],
  plugins: [require('flowbite/plugin')],
}