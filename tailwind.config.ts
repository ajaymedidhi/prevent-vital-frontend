import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', '"Fira Code"', "ui-monospace", "monospace"],
      },

      colors: {
        /* ── Brand scale (Medical Blue) ── */
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1B4570",
          900: "#162f54",
          950: "#0d1d37",
        },
        /* ── Wellness / Teal scale ── */
        wellness: {
          50:  "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        /* ── Design tokens (maps to CSS vars) ── */
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "section-alt":  "hsl(var(--section-alt))",
        "section-teal": "hsl(var(--section-teal))",
        sidebar: {
          DEFAULT:              "hsl(var(--sidebar-background))",
          foreground:           "hsl(var(--sidebar-foreground))",
          primary:              "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent:               "hsl(var(--sidebar-accent))",
          "accent-foreground":  "hsl(var(--sidebar-accent-foreground))",
          border:               "hsl(var(--sidebar-border))",
          ring:                 "hsl(var(--sidebar-ring))",
        },
      },

      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
        xl:   "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },

      boxShadow: {
        xs:             "var(--shadow-xs)",
        sm:             "var(--shadow-sm)",
        md:             "var(--shadow-md)",
        lg:             "var(--shadow-lg)",
        xl:             "var(--shadow-xl)",
        card:           "var(--shadow-xs)",
        "card-hover":   "var(--shadow-md)",
        modal:          "var(--shadow-xl)",
        "glow-primary": "var(--shadow-glow-primary)",
        "glow-accent":  "var(--shadow-glow-accent)",
        "glow-brand":   "0 0 20px rgba(27, 69, 112, 0.25)",
        "glow-teal":    "0 0 20px rgba(13, 148, 136, 0.25)",
        "glow-green":   "0 0 12px rgba(16, 185, 129, 0.25)",
        "glow-red":     "0 0 12px rgba(239, 68, 68, 0.25)",
      },

      backgroundImage: {
        "gradient-hero":    "var(--gradient-hero)",
        "gradient-health":  "var(--gradient-health)",
        "gradient-soft":    "var(--gradient-soft)",
        "gradient-card":    "var(--gradient-card)",
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "sidebar": "256px",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.6" },
        },
        "slow-zoom": {
          "0%":   { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        scroll: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%":   { boxShadow: "0 0 0 0 hsl(174 84% 31% / 0.35)" },
          "70%":  { boxShadow: "0 0 0 10px hsl(174 84% 31% / 0)" },
          "100%": { boxShadow: "0 0 0 0 hsl(174 84% 31% / 0)" },
        },
      },

      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "fade-up":         "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in":         "fade-in 0.6s ease-out forwards",
        "scale-in":        "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up":        "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right":  "slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer:           "shimmer 2.5s linear infinite",
        float:             "float 6s ease-in-out infinite",
        "pulse-soft":      "pulse-soft 3s ease-in-out infinite",
        "slow-zoom":       "slow-zoom 20s linear infinite alternate",
        scroll:            "scroll 30s linear infinite",
        "pulse-ring":      "pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
      },

      transitionTimingFunction: {
        "spring":    "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
