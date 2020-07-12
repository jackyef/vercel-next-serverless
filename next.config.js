const withImages = require('next-images');
const withOffline = require('next-offline');

const config = {
  dontAutoRegisterSw: false,
  // generateInDevMode: true,
  generateSw: false,
  workboxOpts: {
    swSrc: './src/serviceWorker/base.js',
    swDest: 'static/service-worker.js',
  },
};

module.exports = withImages(withOffline(config));
