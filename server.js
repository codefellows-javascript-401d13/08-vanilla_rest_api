'use strict';

const http = require('http');
const Movie = require('./model/movie.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/movie', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('movie', req.url.query.id)
    .then( movie => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(movie));
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


router.post('/api/movie', function(req, res) {
  try {
    var movie = new Movie(req.body.name, req.body.director);
    storage.createItem('movie', movie);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(movie));
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


server.listen(PORT, ()  => {
  console.log('server up on port:', PORT);
});
