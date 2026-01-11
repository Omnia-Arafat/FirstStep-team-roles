import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#B92C28',
          green: '#4BB484',
          blue: '#212C6E',
        },
        role: {
          owner: '#B92C28',
          cto: '#3f6cff',
          pm: '#4BB484',
          design: '#8e24aa',
          frontend: '#039be5',
          backend: '#5e35b1',
          mobile: '#fb8c00',
          support: '#7cb342',
        }
      },
    },
  },
  plugins: [],
};
export default config;
