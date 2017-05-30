const R = require('ramda');
const Promise = require('bluebird');

const echoMiddleware = function(options) {
  return Promise.resolve(
    R.set(
      R.lensProp('response'),{
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Powered-By': 'bacon'
        },
        body: [JSON.stringify(options.request)]
      }, options
    )
  );
};

module.exports = echoMiddleware;