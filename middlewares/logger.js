const R = require('ramda');
const Cont = require('../monads/continuation')
const Either = require('monet').Either;
// const Promise = require('bluebird');

const loggerMiddleware = function(options) {
  return new Cont(function(resolve) {
    console.log(`-> ${options.request.method} - ${options.request.url}`);
    resolve(Either.Right(options));
  });
};

// const loggerMiddleware = function(options) {
//   console.log(`-> ${options.request.method} - ${options.request.url}`);
//   return Promise.resolve(options);
// };

module.exports = loggerMiddleware;