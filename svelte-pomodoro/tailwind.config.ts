/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'pomodoro-red': '#ba4949',
        'pomodoro-red-light': '#c35252',
      }
    },
  },
  plugins: [],
} 