
# Functional server

The idea behind this project is to create a different approach of managing requests/responses from a NodeJS server.

## Middleware

Keeping ExpressJS in mind, if you program each middleware as a pure function that process an object with a request/response message you can implement the middleware chain as a function composition.
Each middleware function can act over the request/response message.
Suppose a pure function like the following (R is for [Ramda](http://ramdajs.com)):

```javascript
const sayHelloMiddleware = function(options) {
  if(options.request.url !== '/hello') {
    return otions;
  }

  return R.set(
    R.lensProp('response'),{
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: ['Hello World\n']
    }, options
  );
};
```
This function will process only the requests with a '/hello' url and changes the reponse object.
The options object has the following signature:

```json
{
  request: {
    method: 'GET',
    url: '/hello',
    headers: {
      ...
    },
    body: ...
  },
  response: {
    status: 200,
    headers: {
      ...
    },
    body: [ ... ]
  }
}
```
Then you can launch the server chaining several of this pure functions:

```javascript
getServer({
  middleware: R.pipe(loggerMiddleware, helloMiddleware, notFoundMiddleware)
}).listen(1337, '127.0.0.1');
```
Currently I am working towards this target, but for now is implemented with Promises.
I will use Tasks monads...

