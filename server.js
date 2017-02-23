'use strict';
const http = require('http');
const Movie = require('./model/movie.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();
require('./route/movie-route.js')(router);

const server = http.createServer(router.route());


server.listen(PORT, ()  => {
  console.log('server up on port:', PORT);
});
