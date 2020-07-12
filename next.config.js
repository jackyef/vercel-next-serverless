const withImages = require('next-images');
const withOffline = require('next-offline');

const config = {};

module.exports = withOffline(withImages(config));
