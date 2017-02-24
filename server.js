'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 3000;
const router = new Router();
const dogRouter = require('./route/resource-route.js');

dogRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up on:', PORT);
});
