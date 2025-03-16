import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        flatprimary: {
          '500': 'rgb(21, 25, 40)',
          '600': 'rgb(51, 55, 70)',
          '700': 'rgb(71, 75, 90)',
          DEFAULT: 'rgb(21, 25, 40)'
        },
        landing: {
          primary: {
            '50': '#F6E8FC',
            '100': '#ECD1FA',
            '200': '#D9A4F4',
            '300': '#C676EF',
            '400': '#B449E9',
            '500': '#A11BE4',
            '600': '#8116B6',
            '700': '#601089',
            '800': '#400B5B',
            '900': '#20052E',
          },
          secondary: {
            '50': '#E8FCF6',
            '100': '#D1FAEC',
            '200': '#A4F4D9',
            '300': '#76EFC6',
            '400': '#49E9B4',
            '500': '#1BE4A1',
            '600': '#16B681',
            '700': '#108960',
            '800': '#0B5B40',
            '900': '#052E20',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        original: '0px 1px 2px 1px #1018281A'
      },
      backgroundImage: {
        'gradient-primary-1': 'linear-gradient(81.62deg, rgb(49, 56, 96) 2.25%, rgb(21, 25, 40) 79.87%);',
        'gradient-primary-2': 'linear-gradient(81.62deg, rgb(79, 86, 126) 2.25%, rgb(51, 55, 70) 79.87%);',
        'gradient-primary-3': 'linear-gradient(81.62deg, rgb(99, 106, 146) 2.25%, rgb(71, 75, 90) 79.87%);'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
