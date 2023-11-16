module.exports = {
    plugins: {
      'postcss-preset-env': {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'nesting-rules': true, // Enable nesting like in Sass
        },
      },
      tailwindcss: {},
    },
  };