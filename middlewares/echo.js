const R = require('ramda');
const Cont = require('../monads/continuation')
const Either = require('monet').Either;
// const Promise = require('bluebird');

const echoMiddleware = function(options) {
  return new Cont(function(resolve) {
    resolve(
      Either.Right(
        R.set(
          R.lensProp('response'),{
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'X-Powered-By': 'bacon',
            },
            body: [JSON.stringify(options.request)],
          }, options,
        ),
      ),
    );
  });
};

// const echoMiddleware = function(options) {
//   return Promise.resolve(
//     R.set(
//       R.lensProp('response'),{
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Powered-By': 'bacon'
//         },
//         body: [JSON.stringify(options.request)]
//       }, options
//     )
//   );
// };

module.exports = echoMiddleware;