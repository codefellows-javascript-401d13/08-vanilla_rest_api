'use strict';

const http = require('http');
const Rwby = require('./model/rwby.js');
const storage = require('./lib/storage.js');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/rwby', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('rwby', req.url.query.id)
    .then(rwby => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(rwby));
      res.end();
    }).catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('item not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('Bad Request');
  res.end();
});

router.post('/api/rwby', function(req, res){
  try{
    var rwby = new Rwby(req.body.name, req.body.weapon);
    storage.createItem('rwby', rwby);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(rwby));
    res.end();
  } catch(err) {
    console.error('server post', err);
    res.writeHead(400, {
      'Content-Type': 'plain/text'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/rwby', function(req, res) {
  if(req.url.query.id) {
    storage.deleteItem('rwby', req.url.query.id)
    .then(rwby => {
      res.writeHead(204, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(rwby) + 'Deleted');
      res.end();
    }).catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('item not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('Bad Request');
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('Server :', PORT);
});
