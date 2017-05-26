// https://github.com/babel/example-node-server

import R from 'ramda';
import http from 'http';
import flyd from 'flyd';
import Promise from 'bluebird';
import gex from 'gex';

const _globalRequestError = (err) => console.error(err.stack);
const _globalResponseError = (err) => console.error(err.stack);

const _writeResponse = function(responseObject, responseData) {
  responseObject.on('error', _globalResponseError);
  responseObject.writeHead(responseData.status, responseData.header);
  responseData.body.forEach(chunck => responseObject.write(chunck));
  responseObject.end();
};

const _receiveRequestBody = function(requestObject) {
  return new Promise(function(resolve, _reject) {
    let body = flyd.stream();

    // Se recibe un chunk de cuerpo desde el cliente
    requestObject.on('data', (chunk) => body(chunk));

    // Se ha terminado de recibir el cuerpo del cliente
    requestObject.on('end', () => {
      body.end(true);
      resolve(body());
    });
  });
};

const _getRequestData = function(requestObject) {
  return _receiveRequestBody(requestObject).then(function(requestBody) {
    return Promise.resolve({
      method: requestObject.method,
      url: requestObject.url,
      headers: requestObject.headers,
      body: requestBody
    });
  });
};

const _canMiddlewareData = function(requestData, middleware_info) {
  return R.isNil(gex(middleware_info.test).on(requestData.url));
};

const _promiseCallMiddleware = function(requestData, middleware_info, middleware_data) {
  if (_canMiddlewareData(requestData, middleware_info)) {
    return Promise.resolve(middleware_data);
  } else {
    // console.log(middleware_options)
    // if (middleware_options.response) {
    //    return Promise.resolve(middleware_options)
    // }
    console.log(`Calling: ${middleware_info.fn.name}`)
    return middleware_info.fn(middleware_data);
  }
}

const _promiseSequenceMiddlewares = function(requestData, middlewares) {
  let result = Promise.resolve({
    request: requestData
  });
  middlewares.forEach(middleware_info => {
    result = result.then((middleware_data) => _promiseCallMiddleware(requestData, middleware_info, middleware_data));
  });
  return result;
};

const getServer = function(options) {
  return http.createServer((requestObject, responseObject) => {
    _getRequestData(requestObject).then(function(requestData) {
      return _promiseSequenceMiddlewares(requestData, options.middleware)
    }).then(function(result) {
      _writeResponse(
        responseObject,
        result.response
      );
    });

    // Responder a posibles errores
    requestObject.on('error', _globalRequestError);
  });
};

module.exports = {getServer};