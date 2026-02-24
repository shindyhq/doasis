import type { Config } from 'tailwindcss';
// @ts-ignore
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D4A3E', // Dark Sage Green
          foreground: '#FBFBF9', // Milk White
        },
        secondary: {
          DEFAULT: '#7A8C6E', // Mid Sage Green
          foreground: '#FBFBF9', // Milk White
        },
        accent: {
          DEFAULT: '#C3CB98', // Lime Sage (user-specified)
          foreground: '#2D4A3E', // Dark Sage Green
        },
        muted: {
          DEFAULT: '#6B7A5E', // Muted Forest
          foreground: '#FBFBF9',
        },
        rose: {
          DEFAULT: '#D4A5A5', // Dusty Rose
          foreground: '#2D4A3E',
        },
        background: '#FBFBF9', // Milk White
        foreground: '#2D4A3E', // Dark Sage Green
      },
      fontFamily: {
        sans: ['var(--font-cormorant)', 'serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [
    daisyui,
    require('@tailwindcss/typography'),
  ],
  // @ts-ignore
  daisyui: {
    themes: [
      {
        doasis: {
          primary: '#2D4A3E', // Dark Sage Green
          secondary: '#7A8C6E', // Mid Sage Green
          accent: '#C3CB98', // Lime Sage
          neutral: '#4A5E4A', // Forest Neutral
          'base-100': '#FBFBF9', // Milk White
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
};

export default config;
