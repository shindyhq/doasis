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
        background: '#FDFBF7', // Bone
        foreground: '#101010', // Darker Obsidian for better contrast
        primary: {
          DEFAULT: '#0A1B12', // Deep Forest
          foreground: '#FDFBF7',
        },
        secondary: {
          DEFAULT: '#6B5D4E', // Darkened Muted Earth (Passes 4.5:1)
          foreground: '#FDFBF7',
        },
        accent: {
          DEFAULT: '#969a7b', // New Olive Sage
          foreground: '#0A1B12',
          dark: '#7d8161', // Darkened variation
        },
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
          primary: '#4A5D4E',
          secondary: '#8E7D6B',
          accent: '#969a7b',
          neutral: '#2D3A2F',
          'base-100': '#FDFBF7',
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
