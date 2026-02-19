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
          DEFAULT: '#3D2818', // Deep Brown (v2.0)
          foreground: '#F5F2EB', // Cream
        },
        secondary: {
          DEFAULT: '#B5BF9E', // Sage Green (v2.0)
          foreground: '#3D2818', // Deep Brown
        },
        accent: {
          DEFAULT: '#C17B5C', // Terracotta (v2.0)
          foreground: '#F5F2EB', // Cream
        },
        muted: {
          DEFAULT: '#8A9171', // Muted Olive
          foreground: '#F5F2EB',
        },
        rose: {
          DEFAULT: '#D4A5A5', // Dusty Rose
          foreground: '#3D2818',
        },
        background: '#F5F2EB', // Cream
        foreground: '#3D2818', // Deep Brown
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
          primary: '#3D2818', // Deep Brown
          secondary: '#B5BF9E', // Sage Green
          accent: '#C17B5C', // Terracotta
          neutral: '#4A4A4A', // Charcoal
          'base-100': '#F5F2EB', // Cream
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
