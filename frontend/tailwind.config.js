module.exports = {
  content: [
    // Path for the files where Tailwind classes need to be used
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path if necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

