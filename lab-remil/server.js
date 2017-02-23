'use strict';

const http = require('http');
const PORT = 3000;
// const PORT = process.env.PORT | 3000;
const Router = require('./lib/router.js');
const router = new Router();
const Sneaker = require('./model/sneaker.js');
const storage = require('./lib/storage.js');

router.post('/api/sneaker', function(req, res) {
  try {
    var sneaker = new Sneaker(req.body.model, req.body.brand);
    storage.createItem('sneaker', sneaker);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(sneaker));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});


const server = http.createServer(router.route());

server.listen(PORT, () => { console.log('Servin\' it up on: ', PORT); });
