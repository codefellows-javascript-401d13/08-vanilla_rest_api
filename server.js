'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const Guitar = require('./model/guitar.js');
const Router = require('./lib/router.js');
const router = new Router();
const storage = require('./lib/storage.js');

const server = http.createServer(router.route());


router.get('/api/guitar', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('guitar', req.url.query.id)
    .then(guitar => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(guitar));
      res.end();
    })
    .catch( err => {
      console.error('we got here:', err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('not found');
      console.log('here\'s the response:', res);
      res.end();
    });
    return;
  }

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

router.post('/api/guitar', function(req, res) {
  try {
    var guitar = new Guitar(req.body.name, req.body.type, req.body.make);
    storage.createItem('guitar', guitar);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(guitar));
    res.end();
  } catch (err) {
    console.log(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/guitar', function(req, res) {
  if(req.url.query.id) {
    storage.deleteItem('guitar', req.url.query.id)
    .then(() => {
      res.writeHead(204, {
        'Content-Type': 'text/plain'
      });
      res.write('guitar successfully deleted');
      res.end();
    })
    .catch((err) => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

server.listen(PORT, () => {
  console.log('Server up:', PORT);
});
