export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 30px 80px rgba(43, 133, 253, 0.12)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(79, 70, 229, 0.14), transparent 42%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 24%)'
      }
    }
  },
  plugins: []
};
