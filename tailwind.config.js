/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FCF9EE",
          100: "#F7F0D6",
          200: "#EEDFAC",
          300: "#E4CC7D",
          400: "#D8B74E",
          500: "#C5A038", // Antique liquid gold
          600: "#A98329",
          700: "#866420",
          800: "#6B4F1D",
          900: "#57401B",
        },
        champagne: {
          light: "#FBF7EF",
          DEFAULT: "#F3ECE1",
          dark: "#E3D5C0",
        },
        silk: {
          cream: "#FAF8F5",
          sand: "#EFEBE4",
          charcoal: "#161618",
          black: "#0A0A0C",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Cormorant Garamond", "serif"],
        display: ["var(--font-cinzel)", "Italiana", "serif"],
        sans: ["var(--font-montserrat)", "Inter", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-gentle": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #ECC880 0%, #C5A038 50%, #997424 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.18) 50%, transparent 100%)",
        "radial-glow": "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
