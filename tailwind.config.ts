import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Fjalla One", "sans-serif"],
        gulams: ["Gulams Condensed", "sans-serif"],
        balinese: ["Balinese Culture", "sans-serif"],
        condensed: ["Condensed Neue Soft", "sans-serif"],
        dacht: ["Dacht", "sans-serif"],
        falgard: ["Falgard", "sans-serif"],
        gendar: ["Gendar", "sans-serif"],
        granika: ["Granika", "sans-serif"],
        marvelous: ["Marvelous", "sans-serif"],
        neohead: ["Neohead", "sans-serif"],
        bondia: ["Bondia", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        body: ["Poppins", "system-ui", "sans-serif"],
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#fef7ed",
          100: "#fdedd3",
          200: "#fcd9a6",
          300: "#fabf6e",
          400: "#f79834",
          500: "#f1a13b",
          600: "#e2841a",
          700: "#bc6716",
          800: "#975318",
          900: "#7c4617",
        },
        accent: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        "dark-accent": {
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#c1d9f7",
          300: "#8bb5e8",
          400: "#5691d6",
          500: "#446f91",
          600: "#3a5f7d",
          700: "#304f68",
          800: "#263f54",
          900: "#1c2f40",
        },
        darkblue: {
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#b9d9ff",
          300: "#7bb9ff",
          400: "#4e94ff",
          500: "#416d92",
          600: "#365b7a",
          700: "#2d4a63",
          800: "#24394d",
          900: "#1c2c3a",
        },
        dark: {
          900: "#0a0a0a",
          800: "#141414",
          700: "#1f1f1f",
          600: "#2a2a2a",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "morph-slow": "morph-slow 40s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-slow": {
          "0%, 100%": {
            transform: "scale(1) rotate(0deg)",
            borderRadius: "40% 60% 60% 40% / 50% 40% 60% 50%",
          },
          "50%": {
            transform: "scale(1.05) rotate(2deg)",
            borderRadius: "60% 40% 40% 60% / 40% 60% 50% 40%",
          },
        },
        "morph-slow": {
          "0%, 100%": {
            borderRadius: "40% 60% 60% 40% / 50% 40% 60% 50%",
            transform: "rotate(0deg) scale(1)",
          },
          "25%": {
            borderRadius: "60% 35% 55% 45% / 45% 55% 35% 65%",
            transform: "rotate(0.5deg) scale(1.02)",
          },
          "50%": {
            borderRadius: "35% 65% 40% 60% / 60% 30% 70% 40%",
            transform: "rotate(-0.5deg) scale(0.98)",
          },
          "75%": {
            borderRadius: "55% 45% 65% 35% / 40% 60% 40% 60%",
            transform: "rotate(1deg) scale(1.01)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
