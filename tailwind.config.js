/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Warm, natural base palette
        'chronicle': {
          'cream': '#FFF8F0',
          'sand': '#F5EBE0',
          'warm-gray': '#E3DED8',
          'stone': '#C8BDB1',
          'charcoal': '#4A4238',
          'ink': '#2D2621',
          
          // Feature colors - warm and inviting
          'sage': '#A8B896',
          'sage-dark': '#7A8A6A',
          'terracotta': '#D4856A',
          'terracotta-dark': '#B86F56',
          'ochre': '#E6A756',
          'ochre-dark': '#C88D42',
          'clay': '#C4917A',
          'rust': '#B85C4E',
          'moss': '#6B8269',
          'forest': '#4A5D48',
        },
        // Accent colors
        'accent': {
          'blue': '#6B9AC4',
          'emerald': '#6FA070',
          'amber': '#D4A574',
          'rose': '#C67B7A',
          'purple': '#9B8AA4',
          'teal': '#6B9B9B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        'soft': '0.5rem',
        'card': '1.25rem',
        'large': '1.75rem',
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)',
        'medium': '0 4px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03)',
        'large': '0 8px 40px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}
