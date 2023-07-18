/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "genshiken-red": {
          400: "#F45765",
          500: "#F23545",
          600: "#D80E1F"
        },
        "genshiken-yellow": {
          500: "#F2E30F",
          600: "#F2CD13"
        }
      }
    },
  },
  plugins: [],
}
