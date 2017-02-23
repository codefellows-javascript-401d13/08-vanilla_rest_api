'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const Router = require('./lib/router.js');
const router = new Router();
const Cat = require('./model/cat.js');
const storage = require('./lib/storage.js');

const server = http.createServer(router.route());

router.get('/api/cat', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('cat', req.url.query.id)
    .then( cat => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(cat));
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
  } else {
    storage.returnAll()
    .then( catIds => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(catIds));
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
  };
});

router.post('/api/cat', function(req, res) {
  try {
    var cat = new Cat(req.body.name, req.body.color);
    storage.createItem('cat', cat);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(cat));
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

router.delete('/api/cat', function(req, res) {
  try {
    storage.deleteItem('cat', req.url.query.id);
    res.writeHead(204, {
      'Content-Type': 'text/plain'
    });
    res.write('item deleted');
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

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
