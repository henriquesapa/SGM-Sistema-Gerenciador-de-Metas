import type { Config } from "tailwindcss";
import { blue } from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: blue["600"],
        background: blue["50"],
      },
    },
  },
  plugins: [],
};
export default config;
