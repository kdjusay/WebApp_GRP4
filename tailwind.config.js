/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html',
    '.*.html',
    './node_modules/flowbite/**/*.js',
    './src/subjects/*.html',
    './src/navbar/*.html'
  ],
  theme: {
    extend: {
      safelist: ['animate-[fade-in_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]']
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

