'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const Router = require('./lib/router.js');
const router = new Router();

require('./route/guitar-route.js')(router);

const server = http.createServer(router.route());


server.listen(PORT, () => {
  console.log('Server up:', PORT);
});
