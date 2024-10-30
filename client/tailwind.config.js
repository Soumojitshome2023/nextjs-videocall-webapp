/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Changed from lightMode to darkMode for correct dark mode implementation
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Add Flowbite content path
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Add custom colors for dark mode if needed
        dark: {
          'primary': '#1e293b',
          'secondary': '#334155'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}