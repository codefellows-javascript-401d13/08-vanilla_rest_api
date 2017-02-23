'use strict';

const http = require('http');
const PORT = process.env.PORT | 3000;
const Router = require('./lib/router.js');
const router = new Router();

router.get('/sup', function(req, res) {
  console.log(req);
  res.write('sup');
  res.end();
})

const server = http.createServer(router.route());

server.listen(PORT, () => console.log('Servin\' it up on: ', PORT));
