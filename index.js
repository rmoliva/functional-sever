import {getServer} from './server';
import loggerMiddleware from './middlewares/logger';
import sayHelloMiddleware from './middlewares/say_hello';
import echoMiddleware from './middlewares/echo';
import notFoundMiddleware from './middlewares/not_found';

getServer({
  middleware: [{
    test: '*',
    fn: loggerMiddleware
  }, {
    test: '/echo',
    fn: echoMiddleware
  }, {
    test: '/hello',
    fn: sayHelloMiddleware
  }, {
    test: '*',
    fn: notFoundMiddleware
  }]
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');