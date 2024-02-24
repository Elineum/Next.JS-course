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
        black: "#1F1E25",
        grey: "#707C87",
        blue: "#2C36F2",
        white: "#F6F7FF",
      },
      fontSize: {
        sm: ["12px", "140%"],
      },
    },
  },
  plugins: [],
};
export default config;
