/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      width: {
        mobile: "375px",
      },
      fontSize: {
        "4.5xl": "2.5rem",
      },
      colors: {
        tomato: "hsl(4, 100%, 67%)",
        "dark-slate-gray": "hsl(234, 29%, 20%)",
        "charcoal-gray": "hsl(235, 18%, 26%)",
        grey: "hsl(231, 7%, 60%)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
