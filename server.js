'use strict';

const http = require('http');
const Note = require('./model/note.js');
const Mine = require('./model/mydata.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();


router.get('/api/mine', function(req, res){
  if (req.url.query.id) {
    console.log(storage.fetchItem);
    storage.fetchItem('mine', req.url.query.id)
    .then( mine => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(mine));
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

router.post('/api/mine', function(req, res) {
  try {
    var mine = new Mine(req.body.fruit, req.body.apple);
    console.log(storage.createItem);
    storage.createItem('mine', mine);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(mine));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/mine', function(req, res){
  if (req.url.query.id) {
    storage.deleteItem('mine', req.url.query.id)
    .then( mine => {
      res.writeHead(204, {
        'Content-Type': 'text/plain'
      });
      res.write('no content in the body');
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
  }
});

//note one below//

router.get('/api/note', function(req, res){
  if (req.url.query.id) {
    storage.fetchItem('note', req.url.query.id)
    .then( note => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(note));
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

router.post('/api/note', function(req, res) {
  try {
    var note = new Note(req.body.name, req.body.content);
    console.log(storage.createItem);
    storage.createItem('note', note);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(note));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
