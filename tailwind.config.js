/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/client/index.html",
    "./src/client/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('assets/images/login_bg.jpg')",
      }
    },
  },
  plugins: [],
  darkMode: ['class', '[data-mode="dark"]'],
}

