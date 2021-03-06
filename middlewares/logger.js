const R = require('ramda');
const Promise = require('bluebird');

const loggerMiddleware = function(options) {
  console.log(`-> ${options.request.method} - ${options.request.url}`);
  return Promise.resolve(options);
};

module.exports = loggerMiddleware;