import R from 'ramda';
import gex from 'gex';

const sayHelloMiddleware = function(options) {
  return Promise.resolve(
    R.set(
      R.lensProp('response'),{
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Powered-By': 'bacon'
        },
        body: ['Hello World\n']
      }, options
    )
  );
};

module.exports = sayHelloMiddleware;
