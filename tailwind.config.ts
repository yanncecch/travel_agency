import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#07090f',
        foreground: '#f7f4ea',
        gold: {
          100: '#f6e4ac',
          300: '#f2c96e',
          500: '#d4a53f',
          700: '#8b6420'
        }
      },
      boxShadow: {
        aura: '0 0 35px rgba(212, 165, 63, 0.25)'
      },
      backgroundImage: {
        'temporal-grid':
          'radial-gradient(circle at top right, rgba(212,165,63,0.12), transparent 40%), radial-gradient(circle at bottom left, rgba(89,120,188,0.12), transparent 45%)'
      }
    }
  },
  plugins: []
};

export default config;
