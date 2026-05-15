/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'task-in-progress': '#FAD77B',
        'task-completed':   '#79C99E',
        'task-wont-do':     '#F5B8B8',
        'task-todo':        '#E8E8EF',
        'task-add':         '#F5ECD7',
        'btn-amber':        '#E9A23B',
        'btn-green':        '#5CB896',
        'btn-red':          '#E05252',
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
