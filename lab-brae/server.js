'use strict';

const http = require('http');
const Pet = require('./model/pet.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/pet', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('pet', req.url.query.id)
    .then( pet => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(pet));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('not found');
      res.end();
    });

    return;
  };

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

router.post('/api/pet', function(req, res) {
  try {
    var pet = new Pet(req.body.name, req.body.type);
    storage.createItem('pet', pet);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(pet));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  };
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up:', PORT);
});