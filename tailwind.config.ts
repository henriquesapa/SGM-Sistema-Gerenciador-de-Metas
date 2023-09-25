import type { Config } from "tailwindcss";
import { blue } from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: blue,
        background: blue["50"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
