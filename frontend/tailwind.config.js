/** @type {import('tailwindcss').Config} */

module.exports = {

  // =========================
  // DARK MODE
  // =========================
  darkMode: "class",

  // =========================
  // CONTENT
  // =========================
  content: [

    "./src/**/*.{js,jsx,ts,tsx}",

  ],

  // =========================
  // THEME
  // =========================
  theme: {

    extend: {

      // =========================
      // COLORS
      // =========================
      colors: {

        // PRIMARY COLORS
        primary: "#2563eb",

        secondary: "#7c3aed",

        success: "#22c55e",

        warning: "#facc15",

        danger: "#ef4444",

        info: "#06b6d4",

        // DARK MODE COLORS
        darkbg: "#020617",

        darkcard: "#0f172a",

        darkborder: "#1e293b",

        darkhover: "#172554",

      },

      // =========================
      // BOX SHADOWS
      // =========================
      boxShadow: {

        card:
          "0 8px 25px rgba(0,0,0,0.08)",

        dark:
          "0 8px 25px rgba(0,0,0,0.35)",

        glow:
          "0 0 25px rgba(37,99,235,0.35)",

        soft:
          "0 4px 15px rgba(0,0,0,0.05)",

      },

      // =========================
      // BORDER RADIUS
      // =========================
      borderRadius: {

        xl2: "1.5rem",

        xl3: "2rem",

      },

      // =========================
      // BACKGROUND IMAGES
      // =========================
      backgroundImage: {

        dashboard:
          "linear-gradient(to right, #020617, #0f172a)",

      },

      // =========================
      // ANIMATIONS
      // =========================
      animation: {

        fade:
          "fadeIn 0.4s ease-in-out",

        slide:
          "slideUp 0.5s ease-in-out",

        pulseSoft:
          "pulseSoft 2s infinite",

        float:
          "floating 3s ease-in-out infinite",

      },

      // =========================
      // KEYFRAMES
      // =========================
      keyframes: {

        // FADE
        fadeIn: {

          "0%": {

            opacity: 0,

          },

          "100%": {

            opacity: 1,

          },

        },

        // SLIDE
        slideUp: {

          "0%": {

            opacity: 0,

            transform:
              "translateY(25px)",

          },

          "100%": {

            opacity: 1,

            transform:
              "translateY(0)",

          },

        },

        // SOFT PULSE
        pulseSoft: {

          "0%, 100%": {

            opacity: 1,

          },

          "50%": {

            opacity: 0.7,

          },

        },

        // FLOATING EFFECT
        floating: {

          "0%, 100%": {

            transform:
              "translateY(0px)",

          },

          "50%": {

            transform:
              "translateY(-6px)",

          },

        },

      },

      // =========================
      // TRANSITIONS
      // =========================
      transitionDuration: {

        400: "400ms",

      },

    },

  },

  // =========================
  // PLUGINS
  // =========================
  plugins: [],

};