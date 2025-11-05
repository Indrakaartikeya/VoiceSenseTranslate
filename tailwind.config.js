import tailwindAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './client/index.html',
    './client/src/**/*.{js,ts,jsx,tsx}',
    './client/public/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        chart: {
          1: 'hsl(var(--chart-1) / <alpha-value>)',
          2: 'hsl(var(--chart-2) / <alpha-value>)',
          3: 'hsl(var(--chart-3) / <alpha-value>)',
          4: 'hsl(var(--chart-4) / <alpha-value>)',
          5: 'hsl(var(--chart-5) / <alpha-value>)',
        },
      },
      borderRadius: { lg: '0.5625rem', md: '0.375rem', sm: '0.1875rem' },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['SF Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [tailwindAnimate, typography],
}

        serif: ["Georgia", "serif"],        ring: "hsl(var(--ring) / <alpha-value>)",

        mono: ["SF Mono", "Menlo", "monospace"],        chart: {

      },          "1": "hsl(var(--chart-1) / <alpha-value>)",

      keyframes: {          "2": "hsl(var(--chart-2) / <alpha-value>)",

        "accordion-down": {          "3": "hsl(var(--chart-3) / <alpha-value>)",

          from: { height: "0" },          "4": "hsl(var(--chart-4) / <alpha-value>)",

          to: { height: "var(--radix-accordion-content-height)" },          "5": "hsl(var(--chart-5) / <alpha-value>)",

        },        },

        "accordion-up": {        sidebar: {

          from: { height: "var(--radix-accordion-content-height)" },          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",

          to: { height: "0" },          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",

        },          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",

      },          border: "hsl(var(--sidebar-border) / <alpha-value>)",

      animation: {        },

        "accordion-down": "accordion-down 0.2s ease-out",        "sidebar-primary": {

        "accordion-up": "accordion-up 0.2s ease-out",          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",

      },          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",

    },          border: "var(--sidebar-primary-border)",

  },        },

  plugins: [tailwindAnimate, tailwindTypography],        "sidebar-accent": {

}          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
        success: "hsl(142 47% 50%)",
        info: "hsl(206 73% 57%)",
      },
      borderRadius: {
        lg: ".5625rem",
        md: ".375rem",
        sm: ".1875rem",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["SF Mono", "Menlo", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}