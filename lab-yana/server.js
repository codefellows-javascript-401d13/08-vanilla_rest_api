'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const PORT = 3002;
const router = new Router(); //instantiate a new Router obj

require('./route/blog-route.js')(router); //calls

console.log('router', router);

const server = http.createServer(router.route()); //route() parses the url and body of a request and calls the appropriate method (e.g., GET)

server.listen(PORT, () => { console.log('server up', PORT); } );
