'use strict';

const http = require('http');
const Jacket = require('./model/jacket.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const router = new Router();
const PORT = process.env.PORT || 3000;


router.get('/api/jacket', function(req, res){
  if(req.url.query.id){
    storage.fetchItem('jacket', req.url.query.id)
    .then( jacket => {
      res.writeHead(200, {
        'Content-Type' : 'text/plain'
      });
      res.write(JSON.stringify(jacket));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type' : 'text/plain'
      });
      res.write('Not found');
      res.end();
    })
    return;
  }
  res.writeHead(400, {
    'Content-Type' : 'text/plain'
  });
  res.write('Bad request');
  res.end();
});

router.post('/api/jacket', function(req, res) {
  try {
    var jacket = new Jacket(req.body.name, req.body.content);
    storage.createItem('jacket', jacket);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(jacket));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('Bad request');
    res.end();
  }
});

router.delete('api/jacket', function(req, res) {
  if(req.url.query.id){
    storage.deleteItem('jacket', req.url.query.id)
    .then(jacket => {
      res.writeHead(204, {
        'Content-Type': 'plain/text'
      });
      res.write(JSON.stringify(jacket));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'plain/text'
      });
      res.write('Not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type' : 'plain/text'
  });
  res.write('Bad request');
  res.end();
});

router.get('/*', function(req, res){
  res.writeHead(404, {
    'Content-Type' : 'text/plain'
  });
  res.write('Not found');
  res.end();

  return;
});

const Server = http.createServer(router.route());
Server.listen(PORT, () => console.log('SERVER UP AT PORT ', 8000));
