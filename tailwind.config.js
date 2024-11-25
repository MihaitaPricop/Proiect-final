/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Set 'Roboto' as the primary font
        heading: ["Roboto", "sans-serif"], // Custom font name if you want to use it for headings
      },
    },
  },
  plugins: [],
  // daisyui: {
  //   themes: ["light", "dark"],
  // },
  // plugins: [require("daisyui")],
};
