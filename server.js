'use strict';

const http = require('http');
const Note = require('./model/note.js');
const Oohdata = require('./model/oohdata.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/note', function(req, res) {
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
  };

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

router.post('/api/note', function(req, res) {
  try {
    var note = new Note(req.body.name, req.body.content);
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
  };
});

router.get('/api/oohdata', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('oohdata', req.url.query.id)
    .then( oohdata => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(oohdata));
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

router.post('/api/oohdata', function(req, res) {
  try {
    var oohdata = new Oohdata(req.body.animal, req.body.story);
    storage.createItem('oohdata', oohdata);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(oohdata));
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

router.delete('/api/oodata', function(req, res) {
  if (req.url.query.id) {
    storage.deleteItem('oohdata', req.url.query.id)
    .then( oohdata => {
      res.writeHead(204, {
        'Content-Type': 'text/plain'
      });
      res.write('your data is no more, good bye');
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

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up: ', PORT);
});
