/** @type {import('tailwindcss').Config} */
/**
 * const Config = require('./src/themes/pesto/tailwind.config.cjs');
 */
const postcssConfig = require('./../../../postcss.config.cjs');

module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ], // <script src="./node_modules/flowbite-react/dist/flowbite.min.js"></script>
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["'Inter Tight Variable'", "Helvetica", "Verdana", "sans-serif"],
        body: ["'Inter Tight Variable'", "Helvetica", "Verdana", "sans-serif"],
      },
      boxShadow: {
        inset: " inset 2px 2px 40px -20px rgba(0, 0, 0, 0.3)",
        "inset-s": " inset 2px 2px 30px -10px rgba(0, 0, 0, 0.4)",
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "16px" },
      });
    }),
    require('flowbite/plugin'),
  ],
}