/** @type {import('postcss-load-config').Config} */
const config = {
  syntax: 'postcss-scss',
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
