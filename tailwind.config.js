/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep':      '#060B14',
        'bg-card':      '#0D1A2A',
        'bg-panel':     '#0F2040',
        'cyan':         '#00D4FF',
        'cyan-dim':     '#0EA5C9',
        'purple':       '#7B2FBE',
        'teal':         '#00D4AA',
        'text-primary': '#E2EEFF',
        'text-muted':   '#7B9EC7',
      },
      fontFamily: {
        sans: ['Rajdhani', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan':   '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-purple': '0 0 20px rgba(123, 47, 190, 0.4)',
        'glow-teal':   '0 0 20px rgba(0, 212, 170, 0.4)',
      },
    },
  },
  plugins: [],
}