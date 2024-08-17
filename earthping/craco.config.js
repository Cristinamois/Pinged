const path = require('path');

module.exports = {
  webpack: {
    alias: {
      path: require.resolve('path-browserify'),
    },
    configure: (webpackConfig) => {
      // Ajoutez d'autres configurations si nécessaire
      return webpackConfig;
    },
  },
};
