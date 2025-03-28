/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#1a202c', // Ensure gray.900 is defined here
        },
      },
      cursor: {
        custom: 'url(/src/assets/cursor.png), auto', // Replace with the path to your cursor image
      },
    },
  },
  plugins: [],
}
