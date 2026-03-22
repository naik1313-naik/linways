/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#050816',
        glass: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(126, 95, 255, 0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(126,95,255,0.4), rgba(5,8,22,0.7) 45%, rgba(5,8,22,1) 100%)',
      },
    },
  },
  plugins: [],
};
