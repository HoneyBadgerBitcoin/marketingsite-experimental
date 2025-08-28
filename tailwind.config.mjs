/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Palette (primary kept from previous, added dark-accent & darkblue to match usage)
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        accent: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#c7ddff',
          300: '#9ec8ff',
          400: '#6ba6ff',
          500: '#3d7fff',
          600: '#024eb3',
          700: '#023f95',
          800: '#023377',
          900: '#02265a',
        },
        'dark-accent': {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#c1d9f7',
          300: '#8bb5e8',
          400: '#5691d6',
          500: '#446f91',
          600: '#3a5f7d',
          700: '#304f68',
          800: '#263f54',
          900: '#1c2f40',
        },
        darkblue: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9d9ff',
          300: '#7bb9ff',
          400: '#4e94ff',
          500: '#416d92',
          600: '#365b7a',
          700: '#2d4a63',
          800: '#24394d',
          900: '#1c2c3a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Vibrant green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Warm amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        dark: {
          50: '#18181b',
          100: '#131316',
          200: '#0f0f12',
          300: '#0b0b0e',
          400: '#08080a',
          500: '#050507', // Deep dark
          600: '#040405',
          700: '#030304',
          800: '#020203',
          900: '#010102',
        },
        light: {
          50: '#ffffff',
          100: '#fafbfc',
          200: '#f5f6f8',
          300: '#eff1f4',
          400: '#e5e8ec',
          500: '#dce0e5',
          600: '#c9ced6',
          700: '#b4bbc6',
          800: '#9ca4b2',
          900: '#7e8799',
        },
        // Corporate color palette for professional appearance
        corporate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        heading: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
        gulams: ['Gulams Condensed', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'neon-flicker': 'neon-flicker 1.5s ease-in-out infinite alternate',
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
        'scale-bounce': 'scale-bounce 0.5s ease-out',
        'tilt': 'tilt 0.3s ease-out',
        'glow-border': 'glow-border 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { 
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)' 
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.8), 0 0 80px rgba(0, 240, 255, 0.5), 0 0 120px rgba(0, 240, 255, 0.3)' 
          }
        },
        'neon-flicker': {
          '0%, 100%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            opacity: '1'
          },
          '50%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            opacity: '0.8'
          }
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'scale-bounce': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'tilt': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(2deg)' }
        },
        'glow-border': {
          '0%': { 
            borderColor: 'rgba(0, 240, 255, 0.5)',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)'
          },
          '100%': { 
            borderColor: 'rgba(0, 240, 255, 1)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(0, 240, 255, 0.3)'
          }
        }
      },
      backgroundImage: {
        // Modern gradients
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
        'gradient-accent': 'linear-gradient(135deg, #024eb3 0%, #023f95 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #22c55e 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        'gradient-dark': 'linear-gradient(180deg, #18181b 0%, #09090b 100%)',
        'gradient-light': 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(280,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
        'large': '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        'xl': '0 20px 48px 0 rgba(0, 0, 0, 0.2)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'card': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05), 0 12px 24px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
      }
    },
  },
  plugins: [],
}
