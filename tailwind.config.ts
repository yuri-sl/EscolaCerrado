import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        happyMonkey: ["Happy Monkey", "cursive"],
        gentium: ["Gentium Basic", "serif"],
      },
    colors: {
      Amarelo: "#FBDF4F",
      AmareloClaro: "#FFEF9B",
      Verde: "#BFBE50",
      VerdeEscuro: "#838335",
      VerdeEscuro2: "#5E541D",
      VerdeClaro1: "#D2D286",
      VerdeClaro2: "#D6D57F",
      VerdeBemClaro: "#F5F4E8",
      Laranja: "#E87325",
      Marrom: "#A6551C",
      MarromEscuro: "#3E300F",
      Creme: "#F5F4E8",
      Menta: "#B4EBA6",
      Azul: "#759E99",
      Branco: "#FFFFFF",
      Preto: "#000000",
      Preto2: "#3E300F",
    },
  },
},
  plugins: [],
};

export default config;
