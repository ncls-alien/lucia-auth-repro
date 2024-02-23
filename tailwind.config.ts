import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fg: "rgba(var(--foreground-rgb), <alpha-value>)",
        bg: "rgba(var(--background-rgb), <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
