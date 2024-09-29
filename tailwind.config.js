const animate = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontSize: {
        md: ['17px', '26px'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // PRIMARY COLORS
        // Backgrounds
        'prime-b-0': 'var(--primary-0)',
        'prime-b-1': 'var(--primary-1)',
        'prime-b-2': 'var(--primary-2)',
        // Interactive
        'prime-i-1': 'var(--primary-3)',
        'prime-i-2': 'var(--primary-4)',
        'prime-i-3': 'var(--primary-5)',
        // Outline
        'prime-o-1': 'var(--primary-6)',
        'prime-o-2': 'var(--primary-7)',
        'prime-o-3': 'var(--primary-8)',
        // Solid Color
        'prime-c-1': 'var(--primary-9)',
        'prime-c-2': 'var(--primary-10)',
        // Text
        'prime-t-1': 'var(--primary-13)',
        'prime-t-2': 'var(--primary-12)',
        'prime-t-3': 'var(--primary-11)',

        // GRAY COLORS
        // Backgrounds
        'gray-b-0': 'var(--gray-0)',
        'gray-b-1': 'var(--gray-1)',
        'gray-b-2': 'var(--gray-2)',
        // Interactive
        'gray-i-1': 'var(--gray-3)',
        'gray-i-2': 'var(--gray-4)',
        'gray-i-3': 'var(--gray-5)',
        // Outline
        'gray-o-1': 'var(--gray-6)',
        'gray-o-2': 'var(--gray-7)',
        'gray-o-3': 'var(--gray-8)',
        // Solid Color
        'gray-c-1': 'var(--gray-9)',
        'gray-c-2': 'var(--gray-10)',
        // Text
        // Main Heading
        'gray-t-1': 'var(--gray-13)',
        // Sub Heading, Default Text
        'gray-t-2': 'var(--gray-12)',
        // Descriptions, etc..
        'gray-t-3': 'var(--gray-11)',
        'transparent': 'transparent',
      },
      borderRadius: {
      	xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [animate],
}