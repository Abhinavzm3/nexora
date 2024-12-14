/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // DaisyUI plugin
    require('tailwind-scrollbar')({ nocompatible: true }), // Tailwind Scrollbar plugin
  ],
};
