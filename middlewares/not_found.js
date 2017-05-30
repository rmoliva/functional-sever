const R = require('ramda');
const Promise = require('bluebird');

const notFoundMiddleware = function(options) {
  if (options.response) {
    return options;
  }

  return Promise.resolve(
    R.set(
      R.lensProp('response'),{
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'X-Powered-By': 'bacon'
        },
        body: [`Page: '${options.request.url}' Not Found on the server`]
      }, options
    )
  );
};

module.exports = notFoundMiddleware;
