const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-styled-components',
    {
      // This option forces styled-components to generate and inject CSS into the build output.
      // It's typically used for SSR, but can resolve issues with CSS not appearing in production.
      ssr: true,
      // Helps debugging by adding component names to class names in dev (optional but good practice)
      displayName: process.env.NODE_ENV !== 'production',
      // Minify CSS in production (optional optimization)
      minify: true,
      // Enable tree-shaking for styled components (optional optimization)
      pure: true,
    }
  ])
);
