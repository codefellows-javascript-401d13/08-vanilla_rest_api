'use strict';

const http = require('http');
const Memo = require('./model/memo.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 8000;
const router = new Router();

router.get('/api/memo', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('memo', req.url.query.id)
    .then( memo => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(memo));
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
  }

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

router.post('/api/memo', function(req, res) {
  try {
    var memo = new Memo(req.body.author, req.body.entry);
    storage.createItem('memo', memo);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(memo));
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